from .api.serializers import (
    DriverProfileSerializer,
    DriverCarSerializer
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status, generics
from rest_framework.response import Response
from .models import VehicleComfortOptions
from .api_perm.permissions import IsObjectOwnerReadOnly
from .models import DriverCars, DriverProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateDriverProfileApi(generics.CreateAPIView):
    serializer_class = DriverProfileSerializer
    permission_classes = [ IsAuthenticated ]
    def create(self, request):
        print(request.user)
        serializer = self.get_serializer(data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RetrieveDrProfileApi(generics.RetrieveUpdateAPIView):
    serializer_class = DriverProfileSerializer
    queryset = DriverProfile
    permission_classes = [ IsAuthenticated, IsObjectOwnerReadOnly ]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self, request, pk, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)




class DriverCarCreateAPI(generics.CreateAPIView):
    serializer_class = DriverCarSerializer
    permission_classes = [ IsAuthenticated ]
    def create(self, request):
        serializer = self.get_serializer(data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)





class RetrieveCarAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DriverCarSerializer
    queryset = DriverCars
    permission_classes = [ IsAuthenticated, IsObjectOwnerReadOnly ]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)




