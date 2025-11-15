from urllib.parse import quote
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from bson import ObjectId
from nehru_backend.mongo import db
from django.core.files.storage import default_storage

# MongoDB Collection
license_collection = db["licenses"] if db is not None else None


class LicenseViewSet(viewsets.ViewSet):
    http_method_names = ["get", "post", "delete"]

    # ---------------- LIST ----------------
    def list(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = list(license_collection.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return Response(data)

    # ---------------- CREATE LICENSE ----------------
    def create(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = dict(request.data)
        phone = data.get("phone")

        if not phone:
            return Response({"error": "Phone number is required"}, status=400)

        exists = license_collection.find_one({"phone": phone})
        if exists:
            return Response(
                {"error": "This phone number is already registered for a license."},
                status=400,
            )

        photo = request.FILES.get("photo")
        photo_path = None

        if photo:
            photo_path = default_storage.save(f"licenses/photos/{photo.name}", photo)

        license_doc = {
            "name": data.get("name"),
            "aadhar_number": data.get("aadhar_number"),
            "phone": phone,
            "address": data.get("address"),
            "photo": request.build_absolute_uri(f"/media/{photo_path}") if photo_path else None,
            "is_approved": False,
        }

        result = license_collection.insert_one(license_doc)
        license_doc["_id"] = str(result.inserted_id)

        return Response(license_doc, status=201)

    # ---------------- DELETE LICENSE ----------------
    def destroy(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        license_collection.delete_one({"_id": ObjectId(pk)})
        return Response({"message": "License deleted"}, status=204)

    # ---------------- APPROVE LICENSE ----------------
    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        license_doc = license_collection.find_one({"_id": ObjectId(pk)})
        if not license_doc:
            return Response({"error": "License not found"}, status=404)

        # GENERATE PDF
        html_content = render_to_string(
            "license_template.html",
            {"license": license_doc, "request": request},
        )

        pdf_bytes = HTML(
            string=html_content,
            base_url=request.build_absolute_uri("/"),
        ).write_pdf()

        safe_name = "".join(
            c for c in license_doc["name"] if c.isalnum() or c in " _-"
        )
        file_name = f"NEHRU_MLA_{safe_name}.pdf"
        file_path = f"licenses/generated/{file_name}"

        saved_path = default_storage.save(file_path, pdf_bytes)
        pdf_url = request.build_absolute_uri(f"/media/{file_path}")

        license_collection.update_one(
            {"_id": ObjectId(pk)},
            {"$set": {"is_approved": True, "license_pdf": pdf_url}},
        )

        # WHATSAPP MESSAGE
        message = (
            f"🎉 Hello {license_doc['name']}!\n\n"
            f"Your Membership Card has been approved! 🎖️\n\n"
            f"📄 Download your certificate:\n{pdf_url}\n\n"
            f"Thank you for joining the movement."
        )

        encoded = quote(message)
        whatsapp_link = f"https://wa.me/91{license_doc['phone']}?text={encoded}"

        return Response({
            "message": "Approved successfully!",
            "whatsapp_link": whatsapp_link,
            "pdf_url": pdf_url
        })

    # ---------------- CHECK PHONE (LIVE VALIDATION) ----------------
    @action(detail=False, methods=["get"])
    def check_phone(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        phone = request.GET.get("phone")

        if not phone:
            return Response({"available": False, "message": "Phone number required"}, status=400)

        exists = license_collection.find_one({"phone": phone})

        if exists:
            return Response({"available": False, "message": "This phone number is already registered."})

        return Response({"available": True, "message": "Phone number available."})


# ---------------- DOWNLOAD LICENSE ----------------
@api_view(["GET"])
def download_license(request):
    if license_collection is None:
        return Response({"error": "MongoDB not connected"}, status=503)

    try:
        phone = request.GET.get("phone")
        if not phone:
            return Response({"error": "Phone is required"}, status=400)

        license_doc = license_collection.find_one({"phone": phone, "is_approved": True})
        if not license_doc:
            return Response({"error": "Not found or not approved"}, status=404)

        license_doc["id"] = str(license_doc["_id"])

        if license_doc.get("photo") and not license_doc["photo"].startswith("http"):
            license_doc["photo"] = request.build_absolute_uri(license_doc["photo"])

        html_content = render_to_string(
            "license_template.html",
            {"license": license_doc, "request": request}
        )

        pdf_bytes = HTML(
            string=html_content,
            base_url=request.build_absolute_uri("/")
        ).write_pdf()

        safe_name = "".join(
            c for c in license_doc.get("name", "member") if c.isalnum() or c in " _-"
        )

        response = HttpResponse(pdf_bytes, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="NEHRU_MLA_{safe_name}.pdf"'
        return response

    except Exception as e:
        return Response({"error": str(e)}, status=500)
