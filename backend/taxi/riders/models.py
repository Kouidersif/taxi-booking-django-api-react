from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL


PROFILE_STATUS = (
    ("Active", "Active"),
    ("Pending", "Pending"),
    ("Suspended", "Suspended"),
)
ACCOUNT_DEFAULT_STATUS = "Active"

class RiderProfile(models.Model):
    user = models.OneToOneField(User, related_name="rider_profile" ,on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="rider/profile/")
    account_status = models.CharField(max_length=299, choices=PROFILE_STATUS, default=ACCOUNT_DEFAULT_STATUS)
    created_on = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name



class SavedAddresses(models.Model):
    rider = models.ForeignKey(RiderProfile, on_delete=models.CASCADE)
    address = models.CharField(max_length=500)

    def __str__(self):
        return self.address


@receiver(signal=post_save, sender=User)
def createUserProfile(instance, created, **kwargs):
    if created and instance.is_rider:
        RiderProfile.objects.create(user=instance)
