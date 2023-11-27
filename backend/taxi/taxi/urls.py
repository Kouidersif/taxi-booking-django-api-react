
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenBlacklistView, TokenVerifyView
)
from django.conf.urls.static import static
from django.conf import settings

from .tokens.custom_token import  MyTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("rides/", include("rides.urls")),
    path("drivers/", include("drivers.urls")),
    path("riders/", include("riders.urls")),
    path("auth/", include("authapp.urls")),
    path("app/", include("app_settings.urls")),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),


    
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)