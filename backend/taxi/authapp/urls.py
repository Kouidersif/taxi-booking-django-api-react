from django.urls import path
from .views import (
    CreateUserAPIVIEW, RetrieveUserAPI
)

urlpatterns = [
    path("", CreateUserAPIVIEW.as_view(), name="user-create"),
    path("<int:pk>/", RetrieveUserAPI.as_view(), name="view-user"),
]
