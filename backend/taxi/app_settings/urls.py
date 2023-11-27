from django.urls import path
from .views import (
    SiteConfigsAPIVIEW
)

urlpatterns = [
    path("site/", SiteConfigsAPIVIEW.as_view(), name="site-settings")
]
