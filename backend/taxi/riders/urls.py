from django.urls import path
from .views import (
    CreateRiderProfile, RetrieveRiderProfileAPI, CreateSavedAddress,DeleteAddress,  ListRiderAdresses
)

urlpatterns = [
    path("create/", CreateRiderProfile.as_view(), name="create-rider"),
    path("<int:pk>/", RetrieveRiderProfileAPI.as_view(), name="retrieve-rider"),
    # Saved address
    path("create-address/", CreateSavedAddress.as_view(), name="saved-address"),
    path("saved-addresses/", ListRiderAdresses.as_view(), name="list-addresses"),
    path("saved-addresses/<int:pk>/", DeleteAddress.as_view(), name="delete-addresses"),
]
