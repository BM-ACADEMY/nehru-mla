from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home

urlpatterns = [
    path("", home, name="home"),
    path("admin-django/", admin.site.urls),
   path('api/accounts/', include('nehru_backend.accounts.urls')),
path('api/blog/', include('nehru_backend.blog.urls')),
path('api/gallery/', include('nehru_backend.gallery.urls')),
path('api/banner/', include('nehru_backend.banner.urls')),
path('api/license/', include('nehru_backend.license.urls')),
path('api/complaints/', include('nehru_backend.complaints.urls')),



    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
