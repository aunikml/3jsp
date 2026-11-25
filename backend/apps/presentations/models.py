from django.db import models
from django.conf import settings
from django.utils import timezone

class Presentation(models.Model):
    """
    Presentation metadata model.
    Note: Presentation slide/node content and 3D scenes are hardcoded in the frontend.
    This model manages identity, access, and backend permissions.
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Presentation"
        verbose_name = "Presentations"

    def __str__(self):
        return f"{self.title} ({self.slug})"

class PresentationAccess(models.Model):
    """
    Role-based access record granting a user permission to view or present a presentation.
    """
    ROLE_VIEWER = "viewer"
    ROLE_PRESENTER = "presenter"
    ROLE_ADMIN = "admin"

    ROLE_CHOICES = (
        (ROLE_VIEWER, "Viewer"),
        (ROLE_PRESENTER, "Presenter"),
        (ROLE_ADMIN, "Admin"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="presentation_accesses",
    )
    presentation = models.ForeignKey(
        Presentation,
        on_delete=models.CASCADE,
        related_name="access_records",
    )
    access_role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_VIEWER,
    )
    is_active = models.BooleanField(default=True)
    expiration_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "presentation")
        verbose_name = "Presentation Access"
        verbose_name_plural = "Presentation Accesses"

    def is_valid(self):
        """Returns True if the access grant is active and not expired."""
        if not self.is_active:
            return False
        if self.expiration_date and timezone.now() > self.expiration_date:
            return False
        return True

    def __str__(self):
        return f"{self.user.username} -> {self.presentation.slug} [{self.access_role}]"
