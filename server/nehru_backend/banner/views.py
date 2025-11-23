from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.utils import timezone
from django.utils.text import get_valid_filename
from bson.objectid import ObjectId
from urllib.parse import urlparse
from pathlib import Path
import os
import time

# ✅ Use the correct MongoDB connection
from nehru_backend.mongo import db


class BannerAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    # ------------------------------
    # Helper: Ensure DB is connected
    # ------------------------------
    def _check_db(self):
        if db is None:
            return Response(
                {"error": "Database unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return None

    # ------------------------------
    # Helper: Save file safely
    # ------------------------------
    def _save_file(self, image_file, subfolder="banner"):
        filename = get_valid_filename(image_file.name)
        name, ext = os.path.splitext(filename)
        unique_name = f"{name}_{int(time.time())}{ext}"

        media_dir = Path(settings.MEDIA_ROOT) / subfolder
        media_dir.mkdir(parents=True, exist_ok=True)

        file_path = media_dir / unique_name

        with open(file_path, "wb+") as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        # return “/media/banner/file.jpg”
        return f"/media/{subfolder}/{unique_name}", str(file_path)

    # ------------------------------
    # GET Banners
    # ------------------------------
    def get(self, request, mongo_id=None):
        err = self._check_db()
        if err:
            return err

        banners_collection = db["banners"]

        try:
            if mongo_id:
                banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
                if not banner:
                    return Response({"error": "Banner not found"}, status=404)

                banner["_id"] = str(banner["_id"])
                return Response(banner)

            banners = list(banners_collection.find({}).sort("created_at", -1))
            for b in banners:
                b["_id"] = str(b["_id"])
            return Response(banners)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    # ------------------------------
    # POST Upload Banner
    # ------------------------------
    def post(self, request):
        err = self._check_db()
        if err:
            return err

        banners_collection = db["banners"]

        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "Image is required"}, status=400)

        try:
            rel_path, file_path = self._save_file(image_file)
            full_url = request.build_absolute_uri(rel_path)

            doc = {
                "image_url": full_url,
                "created_at": timezone.now().isoformat(),
            }

            result = banners_collection.insert_one(doc)

            return Response(
                {
                    "message": "Banner uploaded successfully!",
                    "_id": str(result.inserted_id),
                    "image_url": full_url,
                },
                status=201,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=500)

    # ------------------------------
    # PATCH Update Banner
    # ------------------------------
    def patch(self, request, mongo_id):
        err = self._check_db()
        if err:
            return err

        banners_collection = db["banners"]

        try:
            banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
            if not banner:
                return Response({"error": "Banner not found"}, status=404)

            image_file = request.FILES.get("image")
            if not image_file:
                return Response({"error": "No image provided"}, status=400)

            # Save new file
            rel_path, file_path = self._save_file(image_file)
            full_url = request.build_absolute_uri(rel_path)

            # Delete old file
            old_url = banner.get("image_url")
            if old_url:
                old_path = Path(settings.MEDIA_ROOT) / "banner" / Path(urlparse(old_url).path).name
                if old_path.exists():
                    old_path.unlink()

            banners_collection.update_one(
                {"_id": ObjectId(mongo_id)}, {"$set": {"image_url": full_url}}
            )
            banner["image_url"] = full_url
            banner["_id"] = str(banner["_id"])

            return Response(
                {"message": "Banner updated successfully", "banner": banner},
                status=200,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    # ------------------------------
    # DELETE Banner
    # ------------------------------
    def delete(self, request, mongo_id):
        err = self._check_db()
        if err:
            return err

        banners_collection = db["banners"]

        try:
            banner = banners_collection.find_one({"_id": ObjectId(mongo_id)})
            if not banner:
                return Response({"error": "Banner not found"}, status=404)

            # Delete image file
            image_url = banner.get("image_url")
            if image_url:
                file_path = Path(settings.MEDIA_ROOT) / "banner" / Path(urlparse(image_url).path).name
                if file_path.exists():
                    file_path.unlink()

            banners_collection.delete_one({"_id": ObjectId(mongo_id)})
            return Response({"message": "Banner deleted successfully!"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
