from rest_framework import serializers
from .models import Presentation, PresentationAccess

class PresentationSerializer(serializers.ModelSerializer):
    user_role = serializers.SerializerMethodField()

    class Meta:
        model = Presentation
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "is_active",
            "created_at",
            "updated_at",
            "user_role",
        ]

    def get_user_role(self, obj):
        request = self.context.get("request")
        if not request or not request.user or not request.user.is_authenticated:
            return None
        if request.user.is_staff or request.user.is_superuser:
            return "admin"
        access = obj.access_records.filter(user=request.user, is_active=True).first()
        return access.access_role if access else None

class PresentationAccessSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    presentation_slug = serializers.CharField(source="presentation.slug", read_only=True)
    is_valid = serializers.SerializerMethodField()

    class Meta:
        model = PresentationAccess
        fields = [
            "id",
            "user",
            "username",
            "presentation",
            "presentation_slug",
            "access_role",
            "is_active",
            "expiration_date",
            "is_valid",
        ]

    def get_is_valid(self, obj):
        return obj.is_valid()
