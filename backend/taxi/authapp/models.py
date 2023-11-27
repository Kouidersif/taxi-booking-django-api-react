from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    GENDER_OPTIONS = (
        ("Male", "Male"),
        ("Female", "Female")
    )
    username = models.CharField(max_length=299, null=True, blank=True, default="")
    email = models.EmailField(unique=True, null=False, blank=False)
    gender = models.CharField(max_length=299, choices=GENDER_OPTIONS)
    is_driver = models.BooleanField(default=False)
    is_rider = models.BooleanField(default=False)
    edited_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email" 
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        user_type = ""
        if self.is_driver:
            user_type = "driver"
        elif self.is_rider:
            user_type = "rider"
        return f"{user_type} object"
        