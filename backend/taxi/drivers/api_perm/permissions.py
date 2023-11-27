from rest_framework import permissions




class IsObjectOwnerReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    This specific permission is related to Driver Profile and Driver Car ONLY!
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        try:
            return obj.user == request.user 
        except AttributeError:
            return obj.driver.user == request.user