from urllib.parse import quote
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from bson import ObjectId
from nehru_backend.mongo import db
from django.core.files.storage import default_storage
import os


# =========================================
# MongoDB Collection (SAFE)
# =========================================
license_collection = db["licenses"] if db is not None else None


# =========================================
# ViewSet (Using MongoDB Directly)
# =========================================
class LicenseViewSet(viewsets.ViewSet):
    http_method_names = ["get", "post", "delete"]

    def list(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = list(license_collection.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return Response(data)

    def create(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = dict(request.data)
        photo = request.FILES.get("photo")

        photo_path = None
        if photo:
            photo_path = default_storage.save(f"licenses/photos/{photo.name}", photo)

        license_doc = {
            "name": data.get("name"),
            "aadhar_number": data.get("aadhar_number"),
            "phone": data.get("phone"),
            "address": data.get("address"),
            "photo": request.build_absolute_uri(f"/media/{photo_path}") if photo_path else None,
            "is_approved": False,
        }

        result = license_collection.insert_one(license_doc)
        license_doc["_id"] = str(result.inserted_id)

        return Response(license_doc, status=201)

    def destroy(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        license_collection.delete_one({"_id": ObjectId(pk)})
        return Response({"message": "License deleted"}, status=204)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        license_doc = license_collection.find_one({"_id": ObjectId(pk)})
        if not license_doc:
            return Response({"error": "License not found"}, status=404)

        license_collection.update_one(
            {"_id": ObjectId(pk)},
            {"$set": {"is_approved": True}}
        )

        name = license_doc.get("name", "")
        phone = license_doc.get("phone", "")

        download_link = "https://your-frontend-domain.com/membership-download"

        message = (
            f"🎉 Hello {name}!\n\n"
            f"Your membership license has been approved ✅\n"
            f"You can download it here:\n{download_link}"
        )

        encoded = quote(message)
        whatsapp_link = f"https://wa.me/91{phone}?text={encoded}"

        return Response({
            "message": "Approved successfully!",
            "whatsapp_link": whatsapp_link
        })


# =========================================
# License Download API
# =========================================
@api_view(["GET"])
def download_license(request):
    if license_collection is None:
        return Response({"error": "MongoDB not connected"}, status=503)

    try:
        phone = request.GET.get("phone")
        if not phone:
            return Response({"error": "Phone is required"}, status=400)

        license_doc = license_collection.find_one(
            {"phone": phone, "is_approved": True}
        )

        if not license_doc:
            return Response({"error": "Not found or not approved"}, status=404)

        # Convert ObjectId to id string
        license_doc["id"] = str(license_doc["_id"])

        # Fix photo URL
        if license_doc.get("photo") and not license_doc["photo"].startswith("http"):
            license_doc["photo"] = request.build_absolute_uri(license_doc["photo"])

        # Render HTML
        html_content = render_to_string("license_template.html", {
            "license": license_doc,
            "request": request
        })

        base_url = request.build_absolute_uri("/")
        pdf_bytes = HTML(string=html_content, base_url=base_url).write_pdf()

        # Safe filename
        safe_name = "".join(c for c in license_doc.get("name", "member") if c.isalnum() or c in " _-")

        response = HttpResponse(pdf_bytes, content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="NEHRU_MLA_{safe_name}.pdf"'
        return response

    except Exception as e:
        return Response({"error": str(e)}, status=500)
