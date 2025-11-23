from django.urls import path
from .views import BannerAPIView

urlpatterns = [
    path('', BannerAPIView.as_view()),                      # supports /api/banner/
    path('banners/', BannerAPIView.as_view()),              # supports /api/banner/banners/
    path('<str:mongo_id>/', BannerAPIView.as_view()),       # supports /api/banner/<id>/
]
