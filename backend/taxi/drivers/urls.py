from django.urls import path
from .views import (
    CreateDriverProfileApi, DriverCarCreateAPI, RetrieveDrProfileApi, RetrieveCarAPIView
)

urlpatterns = [
    # Profile related
    path("create/", CreateDriverProfileApi.as_view(), name="create-driver"),
    path("profile/<int:pk>/", RetrieveDrProfileApi.as_view(), name="retrieve-driver"),
    # End profile related
    # Car and Docs
    path("car/", DriverCarCreateAPI.as_view(), name="create-car"),
    path("car/<int:pk>/", RetrieveCarAPIView.as_view(), name="retrieve-car"),
]
