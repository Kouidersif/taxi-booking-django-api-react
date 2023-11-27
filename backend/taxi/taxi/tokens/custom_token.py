from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from drivers.api.serializers import DriverProfileSerializer






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["is_driver"] = user.is_driver
        token["is_rider"] = user.is_rider
        if user.is_driver:
            token['driver_profile_id'] = user.driver_profile.id
        if user.is_rider:
            token['rider_profile_id'] = user.rider_profile.id

        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        # Add your extra responses here
        data['is_driver'] = self.user.is_driver
        data['is_rider'] = self.user.is_rider
        if self.user.is_driver:
            driver_object = {
                "user_email":self.user.driver_profile.user.email,
                "profile_picture":str(self.user.driver_profile.profile_picture ),
                "license_front":str(self.user.driver_profile.license_front),
                "license_back":str(self.user.driver_profile.license_back),
                "account_status":str(self.user.driver_profile.account_status)
            }
            data['driver_profile'] = driver_object
        return data
    
    
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
