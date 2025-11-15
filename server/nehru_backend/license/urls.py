from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LicenseViewSet, download_license

router = DefaultRouter()
router.register(r'license', LicenseViewSet, basename='license')

urlpatterns = [
    path('', include(router.urls)),

    # LIVE PHONE CHECK (MUST BE ADDED MANUALLY)
    path('license/check-phone/', LicenseViewSet.as_view({"get": "check_phone"})),

    # DOWNLOAD LICENSE
    path('license-download/', download_license),
]
