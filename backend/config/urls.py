from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root_view(request):
    return JsonResponse({
        "status": "online",
        "message": "Presentation Studio Django Backend API is active.",
        "frontend_dashboard_url": "http://localhost:5173/dashboard",
        "endpoints": {
            "csrf": "/api/auth/csrf/",
            "auth": "/api/auth/",
            "presentations": "/api/presentations/",
            "admin": "/admin/",
        },
    })

urlpatterns = [
    path("", api_root_view, name="api-root"),
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/presentations/", include("apps.presentations.urls")),
]
