from .api.serializers import RiderProfileSerializer, SavedAddressesSerializer
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import RiderProfile, SavedAddresses
from .api_perm.permissions import IsObjectOwnerReadOnly



class CreateRiderProfile(generics.CreateAPIView):
    serializer_class = RiderProfileSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class RetrieveRiderProfileAPI(generics.RetrieveUpdateAPIView):
    serializer_class = RiderProfileSerializer
    queryset = RiderProfile
    permission_classes = [ permissions.IsAuthenticated, IsObjectOwnerReadOnly ]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)




class CreateSavedAddress(generics.CreateAPIView):
    serializer_class = SavedAddressesSerializer
    permission_classes = [ permissions.IsAuthenticated ]

    def create(self, request):
        serializer = self.get_serializer(data=request.data, context={"request":request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListRiderAdresses(generics.ListAPIView):
    serializer_class = SavedAddressesSerializer
    permission_classes = [ permissions.IsAuthenticated ]
    def get_queryset(self):
        queryset = SavedAddresses.objects.filter(rider=self.request.user.rider_profile)
        return queryset



class DeleteAddress(generics.DestroyAPIView):
    serializer_class = SavedAddressesSerializer
    permission_classes = [ permissions.IsAuthenticated ]
    queryset = SavedAddresses