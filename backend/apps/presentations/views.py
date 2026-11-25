from django.db.models import Q
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Presentation, PresentationAccess
from .permissions import HasPresentationAccess
from .serializers import PresentationSerializer, PresentationAccessSerializer

class PresentationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing and retrieving presentations accessible to the current user.
    """
    serializer_class = PresentationSerializer
    permission_classes = [IsAuthenticated, HasPresentationAccess]
    lookup_field = "slug"

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Presentation.objects.none()

        now = timezone.now()

        # Staff can view all active presentations
        if user.is_staff or user.is_superuser:
            return Presentation.objects.filter(is_active=True)

        # Non-staff users can only list presentations they have valid access to
        valid_access_pks = PresentationAccess.objects.filter(
            user=user,
            is_active=True,
        ).filter(
            Q(expiration_date__isnull=True) | Q(expiration_date__gt=now)
        ).values_list("presentation_id", flat=True)

        return Presentation.objects.filter(
            id__in=valid_access_pks,
            is_active=True,
        )

    @action(detail=True, methods=["get"])
    def access(self, request, slug=None):
        """
        Check user access details for a specific presentation.
        """
        presentation = self.get_object()
        user = request.user

        if user.is_staff or user.is_superuser:
            return Response({
                "has_access": True,
                "role": "admin",
                "is_staff": True,
                "presentation_slug": presentation.slug,
            })

        access = PresentationAccess.objects.filter(
            user=user,
            presentation=presentation,
        ).first()

        if not access or not access.is_valid():
            return Response(
                {"has_access": False, "detail": "No valid access granted."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = PresentationAccessSerializer(access)
        return Response({
            "has_access": True,
            "role": access.access_role,
            "access_details": serializer.data,
            "presentation_slug": presentation.slug,
        })
