from django.contrib import admin
from .models import DriverProfile, VehicleComfortOptions, DriverCars

admin.site.register(DriverProfile)
admin.site.register(VehicleComfortOptions)
admin.site.register(DriverCars)