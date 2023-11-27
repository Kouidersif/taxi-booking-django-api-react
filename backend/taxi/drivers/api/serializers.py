from rest_framework import serializers
from drivers.models import DriverProfile, DriverCars, VehicleComfortOptions
from authapp.api.serializers import UserModelSerializer








class DriverCarSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverCars
        fields = "__all__"

    def create(self, validated_data):
        comfort_option = validated_data.get("vehile_comfort") 
        driver_ = validated_data.get("driver") 
        driver_car = DriverCars(
            **validated_data
        )
        driver_car.driver = driver_
        driver_car.save()
        driver_car.vehile_comfort = comfort_option
        driver_car.save()

        return driver_car





class DriverProfileSerializer(serializers.ModelSerializer):
    driver_car = DriverCarSerializer(many=False, read_only=True)
    # user = UserModelSerializer(many=False, read_only=True)
    user = serializers.SerializerMethodField()

    id = serializers.IntegerField(required=False)
    class Meta:
        model = DriverProfile
        fields = [ "id" ,"profile_picture", "user", "license_front", "driver_car", "license_back", "account_status" ]

    def create(self, validated_data):
        get_request = self.context["request"]
        driver_profile = DriverProfile(
            **validated_data
        )
        driver_profile.user = get_request.user
        
        driver_profile.save()

        return driver_profile
    
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
            'email': obj.user.email,
            # other fields as needed
        }

class VehicleComfortSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleComfortOptions
        fields = ( "id","comfort_option", "icon")


