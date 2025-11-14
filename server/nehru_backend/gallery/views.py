from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.utils import timezone
from nehru_backend.mongo import db
from bson.objectid import ObjectId
import os


class GalleryImageAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    # Helper: Prevent crash if MongoDB is disconnected
    def _check_db(self):
        if db is None:
            return Response({"error": "Database not connected"}, status=503)
        return None

    def get(self, request, mongo_id=None):
        """Fetch all gallery images or one by ID"""
        err = self._check_db()
        if err:
            return err

        images_collection = db["gallery_images"]

        try:
            if mongo_id:
                image = images_collection.find_one({"_id": ObjectId(mongo_id)})
                if not image:
                    return Response({"error": "Image not found"}, status=404)

                image["_id"] = str(image["_id"])
                return Response(image)

            images = list(images_collection.find({}).sort("created_at", -1))
            for img in images:
                img["_id"] = str(img["_id"])

            return Response(images)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        """Upload a new gallery image"""
        err = self._check_db()
        if err:
            return err

        images_collection = db["gallery_images"]

        image_file = request.FILES.get("image")
        title = request.data.get("title")

        if not image_file or not title:
            return Response({"error": "Title and image are required"}, status=400)

        if images_collection.find_one({"title": title}):
            return Response({"error": "Title already exists"}, status=400)

        # Save file
        media_dir = os.path.join(settings.MEDIA_ROOT, "gallery")
        os.makedirs(media_dir, exist_ok=True)
        file_path = os.path.join(media_dir, image_file.name)

        with open(file_path, "wb+") as f:
            for chunk in image_file.chunks():
                f.write(chunk)

        # Auto generate URL
        full_url = request.build_absolute_uri(f"/media/gallery/{image_file.name}")

        data = {
            "title": title,
            "image_url": full_url,
            "created_at": timezone.now().isoformat(),
        }

        result = images_collection.insert_one(data)

        return Response(
            {
                "message": "Image added successfully!",
                "_id": str(result.inserted_id),
                "image_url": full_url,
            },
            status=201,
        )

    def patch(self, request, mongo_id):
        """Update gallery image or title"""
        err = self._check_db()
        if err:
            return err

        images_collection = db["gallery_images"]

        try:
            image = images_collection.find_one({"_id": ObjectId(mongo_id)})
            if not image:
                return Response({"error": "Image not found"}, status=404)

            update_data = {}
            title = request.data.get("title")
            image_file = request.FILES.get("image")

            if title:
                update_data["title"] = title

            # Image replacement
            if image_file:
                media_dir = os.path.join(settings.MEDIA_ROOT, "gallery")
                os.makedirs(media_dir, exist_ok=True)
                file_path = os.path.join(media_dir, image_file.name)

                with open(file_path, "wb+") as f:
                    for chunk in image_file.chunks():
                        f.write(chunk)

                full_url = request.build_absolute_uri(f"/media/gallery/{image_file.name}")
                update_data["image_url"] = full_url

                # Delete old image file
                old_image_url = image.get("image_url")
                if old_image_url:
                    old_filename = os.path.basename(old_image_url)
                    old_path = os.path.join(settings.MEDIA_ROOT, "gallery", old_filename)
                    if os.path.exists(old_path):
                        os.remove(old_path)

            if not update_data:
                return Response({"error": "No fields to update"}, status=400)

            images_collection.update_one({"_id": ObjectId(mongo_id)}, {"$set": update_data})

            image.update(update_data)
            image["_id"] = str(image["_id"])

            return Response({"message": "Image updated successfully!", "image": image}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def delete(self, request, mongo_id):
        """Delete one gallery image"""
        err = self._check_db()
        if err:
            return err

        images_collection = db["gallery_images"]

        try:
            image = images_collection.find_one({"_id": ObjectId(mongo_id)})
            if not image:
                return Response({"error": "Image not found"}, status=404)

            # Delete file
            image_url = image.get("image_url")
            if image_url:
                filename = os.path.basename(image_url)
                file_path = os.path.join(settings.MEDIA_ROOT, "gallery", filename)
                if os.path.exists(file_path):
                    os.remove(file_path)

            images_collection.delete_one({"_id": ObjectId(mongo_id)})

            return Response({"message": "Image deleted successfully!"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
