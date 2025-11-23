from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.utils import timezone
from nehru_backend.mongo import db
from bson.objectid import ObjectId
import os


class BlogPostAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    # ------------ Helper: ensure DB connected ------------
    def _check_db(self):
        if db is None:
            return Response({"error": "Database not connected"}, status=503)
        return None

    def get(self, request, post_id=None):
        """GET all posts or a single post"""
        err = self._check_db()
        if err:
            return err

        posts_collection = db["blog_posts"]

        try:
            if post_id:
                post = posts_collection.find_one({"_id": ObjectId(post_id)})
                if not post:
                    return Response({"error": "Post not found"}, status=404)
                post["_id"] = str(post["_id"])
                return Response(post)

            posts = list(posts_collection.find({}).sort("created_at", -1))
            for p in posts:
                p["_id"] = str(p["_id"])
            return Response(posts)

        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        """Create a new blog post"""
        err = self._check_db()
        if err:
            return err

        posts_collection = db["blog_posts"]

        title = request.data.get("title")
        subtitle = request.data.get("subtitle")
        content = request.data.get("content")
        status_post = request.data.get("status", "draft")
        image_file = request.FILES.get("image")

        if not title or not content or not image_file:
            return Response(
                {"error": "Title, content, and image are required"},
                status=400
            )

        media_dir = os.path.join(settings.MEDIA_ROOT, "blog")
        os.makedirs(media_dir, exist_ok=True)
        file_path = os.path.join(media_dir, image_file.name)

        try:
            with open(file_path, "wb+") as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
        except Exception as e:
            return Response(
                {"error": f"Failed to save image: {str(e)}"},
                status=500
            )

        image_url = request.build_absolute_uri(f"/media/blog/{image_file.name}")

        post_data = {
            "title": title,
            "subtitle": subtitle,
            "content": content,
            "status": status_post,
            "image_url": image_url,
            "created_at": timezone.now().isoformat()
        }

        result = posts_collection.insert_one(post_data)
        post_data["_id"] = str(result.inserted_id)

        return Response(
            {"message": "Blog post created successfully!", "post": post_data},
            status=201
        )

    def patch(self, request, post_id):
        """Update blog post"""
        err = self._check_db()
        if err:
            return err

        posts_collection = db["blog_posts"]

        try:
            obj_id = ObjectId(post_id)
        except:
            return Response({"error": "Invalid post ID"}, status=400)

        post = posts_collection.find_one({"_id": obj_id})
        if not post:
            return Response({"error": "Post not found"}, status=404)

        update_data = {}
        for field in ["title", "subtitle", "content", "status"]:
            value = request.data.get(field)
            if value:
                update_data[field] = value

        # Handle image upload
        image_file = request.FILES.get("image")
        if image_file:
            media_dir = os.path.join(settings.MEDIA_ROOT, "blog")
            os.makedirs(media_dir, exist_ok=True)
            file_path = os.path.join(media_dir, image_file.name)

            with open(file_path, "wb+") as f:
                for chunk in image_file.chunks():
                    f.write(chunk)

            full_url = request.build_absolute_uri(f"/media/blog/{image_file.name}")
            update_data["image_url"] = full_url

            # remove old image
            old_image_url = post.get("image_url")
            if old_image_url:
                filename = os.path.basename(old_image_url)
                old_path = os.path.join(settings.MEDIA_ROOT, "blog", filename)
                if os.path.exists(old_path):
                    os.remove(old_path)

        if not update_data:
            return Response({"error": "No valid fields to update"}, status=400)

        posts_collection.update_one({"_id": obj_id}, {"$set": update_data})

        post.update(update_data)
        post["_id"] = str(post["_id"])

        return Response(
            {"message": "Blog updated successfully!", "post": post},
            status=200
        )

    def delete(self, request, post_id):
        """Delete a blog post"""
        err = self._check_db()
        if err:
            return err

        posts_collection = db["blog_posts"]

        try:
            obj_id = ObjectId(post_id)
        except:
            return Response({"error": "Invalid post ID"}, status=400)

        post = posts_collection.find_one({"_id": obj_id})
        if not post:
            return Response({"error": "Post not found"}, status=404)

        # remove image
        image_url = post.get("image_url")
        if image_url:
            filename = os.path.basename(image_url)
            file_path = os.path.join(settings.MEDIA_ROOT, "blog", filename)
            if os.path.exists(file_path):
                os.remove(file_path)

        posts_collection.delete_one({"_id": obj_id})

        return Response({"message": "Blog post deleted successfully!"}, status=200)
