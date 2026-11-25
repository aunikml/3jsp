from django.contrib import admin
from .models import Presentation, PresentationAccess

@admin.register(Presentation)
class PresentationAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_active", "created_at", "updated_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("title", "slug", "description")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(PresentationAccess)
class PresentationAccessAdmin(admin.ModelAdmin):
    list_display = ("user", "presentation", "access_role", "is_active", "expiration_date")
    list_filter = ("access_role", "is_active", "expiration_date")
    search_fields = ("user__username", "user__email", "presentation__title", "presentation__slug")
