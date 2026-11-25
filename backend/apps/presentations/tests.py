from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Presentation, PresentationAccess

class PresentationApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Users
        self.user1 = User.objects.create_user(username="viewer_user", password="password123")
        self.user2 = User.objects.create_user(username="other_user", password="password123")
        self.admin_user = User.objects.create_superuser(username="admin_user", password="password123", email="admin@example.com")

        # Presentations
        self.presentation1 = Presentation.objects.create(
            title="Interactive 3D Demo",
            slug="interactive-3d-demo",
            description="Sample 3D slide deck",
            is_active=True,
        )
        self.presentation2 = Presentation.objects.create(
            title="Private Presentation",
            slug="private-presentation",
            description="Confidential deck",
            is_active=True,
        )

        # Grant user1 access to presentation1 only
        PresentationAccess.objects.create(
            user=self.user1,
            presentation=self.presentation1,
            access_role=PresentationAccess.ROLE_PRESENTER,
            is_active=True,
        )

    def test_unauthenticated_request_rejected(self):
        response = self.client.get(reverse("presentation-list"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_can_only_list_permitted_presentations(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(reverse("presentation-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in response.data]
        self.assertIn("interactive-3d-demo", slugs)
        self.assertNotIn("private-presentation", slugs)

    def test_user_cannot_access_unpermitted_presentation_detail(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("presentation-detail", kwargs={"slug": "private-presentation"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_check_access_endpoint(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse("presentation-access", kwargs={"slug": "interactive-3d-demo"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["has_access"])
        self.assertEqual(response.data["role"], "presenter")

    def test_admin_can_access_all_presentations(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse("presentation-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
