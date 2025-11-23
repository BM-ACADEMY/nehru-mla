from urllib.parse import quote_plus
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from bson import ObjectId
from nehru_backend.mongo import db
from django.core.files.storage import default_storage
from rest_framework.parsers import MultiPartParser, FormParser

license_collection = db["licenses"] if db is not None else None


class LicenseViewSet(viewsets.ViewSet):
    http_method_names = ["get", "post", "delete"]

    # ----------------------------------------------------
    # LIST ALL LICENSES
    # ----------------------------------------------------
    def list(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = list(license_collection.find())
        for item in data:
            item["_id"] = str(item["_id"])
        return Response(data)

    # ----------------------------------------------------
    # RETRIEVE SINGLE LICENSE
    # ----------------------------------------------------
    def retrieve(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        try:
            license_doc = license_collection.find_one({"_id": ObjectId(pk)})
        except:
            return Response({"error": "Invalid ID"}, status=400)

        if not license_doc:
            return Response({"error": "License not found"}, status=404)

        license_doc["_id"] = str(license_doc["_id"])
        return Response(license_doc)

    # ----------------------------------------------------
    # CREATE LICENSE
    # ----------------------------------------------------
    def create(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        data = dict(request.data)
        phone = data.get("phone")

        if not phone:
            return Response({"error": "Phone number is required"}, status=400)

        # Check duplicate phone
        exists = license_collection.find_one({"phone": phone})
        if exists:
            return Response(
                {"error": "This phone number is already registered for a license."},
                status=400,
            )

        # Photo upload
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
            "license_pdf": None,
        }

        result = license_collection.insert_one(license_doc)
        license_doc["_id"] = str(result.inserted_id)

        return Response(license_doc, status=201)

    # ----------------------------------------------------
    # DELETE LICENSE
    # ----------------------------------------------------
    def destroy(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        license_collection.delete_one({"_id": ObjectId(pk)})
        return Response({"message": "License deleted"}, status=204)

    # ----------------------------------------------------
    # APPROVE LICENSE + UPLOAD PDF
    # ----------------------------------------------------
    @action(detail=True, methods=["post"], parser_classes=[MultiPartParser, FormParser])
    def upload_pdf(self, request, pk=None):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        # Find license
        try:
            license_doc = license_collection.find_one({"_id": ObjectId(pk)})
        except:
            return Response({"error": "Invalid ID"}, status=400)

        if not license_doc:
            return Response({"error": "License not found"}, status=404)

        # Uploaded file
        pdf_file = request.FILES.get("pdf_file")
        if not pdf_file:
            return Response({"error": "pdf_file is required"}, status=400)

        if pdf_file.content_type != "application/pdf":
            return Response({"error": "Only PDF allowed"}, status=400)

        # ----------------------------------------------------
        # SAFE UNIQUE FILENAME
        # ----------------------------------------------------
        raw_name = license_doc.get("name", "member")
        safe_name = "".join(c for c in raw_name if c.isalnum() or c in " _-").strip()
        if not safe_name:
            safe_name = "member"

        unique_id = str(ObjectId())
        file_name = f"NEHRU_MLA_{safe_name}_{unique_id}.pdf"
        file_path = f"licenses/generated/{file_name}"

        # Save PDF
        saved_path = default_storage.save(file_path, pdf_file)
        pdf_url = request.build_absolute_uri(f"/media/{saved_path}")

        # Update DB
        license_collection.update_one(
            {"_id": ObjectId(pk)},
            {"$set": {"is_approved": True, "license_pdf": pdf_url}},
        )

        # ----------------------------------------------------
        # CLEAN WHATSAPP MESSAGE — NO UGLY ENCODING
        # ----------------------------------------------------
        message = (
            f"🎉 Hello {license_doc['name']}!\n\n"
            f"Your Membership Card has been approved! 🎖️\n\n"
            f"📄 Download your certificate:\n{pdf_url}\n\n"
            f"Thank you for joining the movement."
        )

        # Only encode spaces/new lines, keep URLs clean
        encoded_text = quote_plus(message, safe=':/')

        whatsapp_link = f"https://api.whatsapp.com/send?phone=91{license_doc['phone']}&text={encoded_text}"


        return Response({
            "message": "PDF uploaded & license approved!",
            "pdf_url": pdf_url,
            "whatsapp_link": whatsapp_link,
        })

    # ----------------------------------------------------
    # CHECK PHONE NUMBER
    # ----------------------------------------------------
    @action(detail=False, methods=["get"])
    def check_phone(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        phone = request.GET.get("phone")
        if not phone:
            return Response({"available": False, "message": "Phone number required"}, status=400)

        exists = license_collection.find_one({"phone": phone})

        if exists:
            return Response({"available": False, "message": "Phone already registered"})

        return Response({"available": True, "message": "Phone number available"})

    # ----------------------------------------------------
    # PUBLIC DOWNLOAD BY PHONE NUMBER
    # ----------------------------------------------------
    @action(detail=False, methods=["get"])
    def download(self, request):
        if license_collection is None:
            return Response({"error": "MongoDB not connected"}, status=503)

        phone = request.GET.get("phone")
        if not phone:
            return Response({"error": "Phone number required"}, status=400)

        license_doc = license_collection.find_one({"phone": phone})

        if not license_doc:
            return Response({"error": "Membership not found"}, status=404)

        if not license_doc.get("is_approved"):
            return Response({"error": "Membership not approved yet"}, status=400)

        pdf_url = license_doc.get("license_pdf")
        if not pdf_url:
            return Response({"error": "Certificate not available"}, status=404)

        # Read file
        try:
            rel_path = pdf_url.split("/media/")[-1]
            with default_storage.open(rel_path, "rb") as f:
                response = HttpResponse(f.read(), content_type="application/pdf")
                response["Content-Disposition"] = "attachment; filename=membership_certificate.pdf"
                return response

        except:
            return Response({"error": "Error reading certificate file"}, status=500)
