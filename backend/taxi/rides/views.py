from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .api.serializers import RideBookingSerializer
from .models import RideBooking


class BookRideUser(generics.CreateAPIView):
    serializer_class = RideBookingSerializer
    permission_classes = [ permissions.IsAuthenticated ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)



class RetrieveRideAPI(generics.RetrieveUpdateAPIView):
    serializer_class = RideBookingSerializer
    queryset = RideBooking
    permission_classes = [ permissions.IsAuthenticated ]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class ListBookedRidesAPI(generics.ListAPIView):
    # http://127.0.0.1:8000/rides/list-booking?ride_status=Accepted&payment_method=Cash&rider__user__first_name=Marta
    serializer_class = RideBookingSerializer
    queryset = RideBooking.objects.all().order_by("-id")
    permission_classes = [ permissions.IsAuthenticated ]
    filterset_fields = ['ride_price', 'payment_method', 'ride_status', 
    'rider__user__first_name', "rider__user__last_name", "rider__user__id",
    "driver__user__first_name", "driver__user__last_name", "driver__user__id"]

