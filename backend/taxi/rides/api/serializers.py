from rest_framework import serializers
from rides.models import RideBooking
from drivers.api.serializers import DriverProfileSerializer
from drivers.models import DriverProfile
from riders.api.serializers import RiderProfileSerializer
from riders.models import RiderProfile


class RideBookingSerializer(serializers.ModelSerializer):
    rider_id = serializers.IntegerField(write_only=True, required=True)
    driver_id = serializers.IntegerField(write_only=True, required=False)
    class Meta:
        model = RideBooking
        fields = [ "id", "pick_up_location", "drop_off_location", "pickup_long_lat", "drop_off_long_lat","ride_car_type", "rider_id", "driver_id", "rider", "driver",
        "ride_price", "distance", "ride_duration", 
        "payment_method", "ride_status", "booked_at" , "modified_at", "agent_created" ] 
        depth= 1


    def create(self, validated_data):
        print("validated_data:", validated_data)
        rider_data = validated_data.pop('rider_id', None)  # Extract rider data if present
        if not validated_data["pick_up_location"] and not validated_data["drop_off_location"]:
            raise serializers.ValidationError({"Error":"Pick up location and Destionation are required!"})
        if not rider_data or rider_data is None:
            raise serializers.ValidationError({"Error":"Rider field is required"})
            
        if not validated_data["ride_car_type"]:
            raise serializers.ValidationError({"Error":"Car type is required"})
        ride = RideBooking.objects.create(**validated_data)  # Create the RideBooking instance
        ride.save()
        
        if rider_data:
            try:
                has_ride_booked = self.Meta.model.objects.filter(rider__id=rider_data, ride_status="Pending")
                if has_ride_booked:
                    raise serializers.ValidationError({"Error":"You can not book more than one ride at same time"})
                rider_profile = RiderProfile.objects.get(id=rider_data)
                ride.rider = rider_profile
                ride.save()
            except RiderProfile.DoesNotExist as e:
                raise serializers.ValidationError({"Error":f"Object cannot be found, please contact support!"})

        return ride

    def update(self, instance, validated_data):
        if instance.ride_status == "Canceled" or instance.ride_status == "Completed":
            raise serializers.ValidationError({"Error":"Ride is no longer available"})

        ride_status_ = validated_data.get("ride_status", instance.ride_status)
        driver_profile_id = validated_data.pop("driver_id", None)
        if driver_profile_id is not None:
            if ride_status_ == "Accepted":
                try:
                    rides = self.Meta.model.objects.filter(driver__id=driver_profile_id, ride_status="Accepted")
                    if rides.exists():
                        raise serializers.ValidationError({"Error":"Finish previous ride to accept new"})
                    driver_obj = DriverProfile.objects.get(id=driver_profile_id)
                    instance.driver = driver_obj 
                    instance.save()
                except DriverProfile.DoesNotExist as e:
                    raise serializers.ValidationError({"Error":f"Account can not be found, Please contact support"})
        
        instance.pick_up_location = validated_data.get("pick_up_location", instance.pick_up_location)
        instance.drop_off_location = validated_data.get("drop_off_location", instance.drop_off_location)
        instance.ride_status = validated_data.get("ride_status", instance.ride_status)
        instance.save()
        return instance
