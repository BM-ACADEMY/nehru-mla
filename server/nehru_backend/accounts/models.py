from django.contrib.auth.models import AbstractUser
from django.db import models

class AdminUser(AbstractUser):
    is_admin = models.BooleanField(default=True)

    # Use email as username field (you already did this)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # keep username as required for AbstractUser internals

    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
