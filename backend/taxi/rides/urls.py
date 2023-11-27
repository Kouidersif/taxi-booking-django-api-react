from django.urls import path
from .views import (
    BookRideUser, ListBookedRidesAPI, RetrieveRideAPI
)


urlpatterns = [
    path("book/", BookRideUser.as_view(), name="book-ride-user"),
    path("list-booking/", ListBookedRidesAPI.as_view(), name="list-booking"),
    path("retrieve-booking/<int:pk>/", RetrieveRideAPI.as_view(), name="update-booking"),
]
