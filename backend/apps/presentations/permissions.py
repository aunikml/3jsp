from rest_framework import permissions
from django.utils import timezone
from .models import PresentationAccess

class HasPresentationAccess(permissions.BasePermission):
    """
    Ensures that the authenticated user has an active, non-expired access grant
    or is a staff member/superuser.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        # Staff/superusers bypass restrictions
        if request.user.is_staff or request.user.is_superuser:
            return True

        access = PresentationAccess.objects.filter(
            user=request.user,
            presentation=obj,
            is_active=True,
        ).first()

        if not access:
            return False

        if access.expiration_date and timezone.now() > access.expiration_date:
            return False

        return True
