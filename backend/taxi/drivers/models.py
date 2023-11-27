from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL

DRIVER_STATUS = (
    ("Active", "Active"),
    ("Pending", "Pending"),
    ("Suspended", "Suspended"),
)
ACCOUNT_DEFAULT_STATUS = "Pending"

class DriverProfile(models.Model):
    user = models.OneToOneField(User, related_name="driver_profile", on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="driver/profile/")
    license_front = models.ImageField(upload_to="driver/document/license/")
    license_back = models.ImageField(upload_to="driver/document/license/")
    account_status = models.CharField(max_length=299, choices=DRIVER_STATUS, default=ACCOUNT_DEFAULT_STATUS)
    created_on = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Driver account - {self.user.first_name}"



class VehicleComfortOptions(models.Model):
    comfort_option = models.CharField(max_length=450)
    icon = models.FileField()
    created_on = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

class DriverCars(models.Model):
    CARS_COLORS = (
        ("Red", "Red"),
        ("Black", "Black"),
        ("Yellow", "Yellow"),
        ("Blue", "Blue"),
    )
    driver = models.OneToOneField(DriverProfile, related_name="driver_car", on_delete=models.CASCADE)
    # Car Details
    vehicle_name_model = models.CharField(max_length=500)
    vehicle_number = models.CharField(max_length=299)
    vehicle_color = models.CharField(max_length=199, choices=CARS_COLORS)
    vehile_comfort = models.ForeignKey(VehicleComfortOptions, on_delete=models.SET_NULL, null=True)
    # Car documents
    vehicle_registration = models.ImageField(upload_to="driver/documents/car")
    vehicle_insurance = models.ImageField(upload_to="driver/documents/car")
    created_on = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)


@receiver(signal=post_save, sender=User)
def createUserProfile(instance, created, **kwargs):
    if created and instance.is_driver:
        DriverProfile.objects.create(user=instance)