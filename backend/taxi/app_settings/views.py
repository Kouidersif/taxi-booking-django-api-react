from .api.serializers import AppConfigSettingsSerializer
from rest_framework import generics
from .models import SiteSettings


class SiteConfigsAPIVIEW(generics.ListAPIView):
    serializer_class = AppConfigSettingsSerializer
    queryset = SiteSettings.objects.all()

