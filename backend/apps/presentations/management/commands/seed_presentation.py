from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.presentations.models import Presentation, PresentationAccess

class Command(BaseCommand):
    help = "Seeds initial demo presentation and presenter user for development."

    def handle(self, *args, **options):
        # Create dev admin user
        admin_user, created = User.objects.get_or_create(
            username="admin",
            defaults={"email": "admin@presentation.local", "is_staff": True, "is_superuser": True},
        )
        if created:
            admin_user.set_password("admin123")
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created admin user (admin / admin123)"))

        # Create presenter user
        presenter_user, created = User.objects.get_or_create(
            username="presenter",
            defaults={"email": "presenter@presentation.local"},
        )
        if created:
            presenter_user.set_password("presenter123")
            presenter_user.save()
            self.stdout.write(self.style.SUCCESS("Created presenter user (presenter / presenter123)"))

        # Create demo presentation
        presentation, created = Presentation.objects.get_or_create(
            slug="interactive-3d-presentation",
            defaults={
                "title": "Interactive 3D Presentation",
                "description": "Foundational 3D Interactive Presentation Deck with Three.js & Theatre.js",
                "is_active": True,
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f"Created presentation: {presentation.title}"))

        # Grant presenter access
        access, created = PresentationAccess.objects.get_or_create(
            user=presenter_user,
            presentation=presentation,
            defaults={"access_role": PresentationAccess.ROLE_PRESENTER, "is_active": True},
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Granted presenter access to demo presentation"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
