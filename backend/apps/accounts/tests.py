from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

class AccountAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "presenter"
        self.password = "Secr3tPassword!123"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
            email="presenter@example.com",
        )

    def test_csrf_token_endpoint(self):
        response = self.client.get(reverse("auth-csrf"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("csrfToken", response.data)

    def test_login_success(self):
        response = self.client.post(
            reverse("auth-login"),
            {"username": self.username, "password": self.password},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["username"], self.username)

    def test_login_failure(self):
        response = self.client.post(
            reverse("auth-login"),
            {"username": self.username, "password": "wrongpassword"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_me_and_logout(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse("auth-me"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["username"], self.username)

        logout_response = self.client.post(reverse("auth-logout"))
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
