from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PresentationViewSet

router = DefaultRouter()
router.register(r"", PresentationViewSet, basename="presentation")

urlpatterns = [
    path("", include(router.urls)),
]
