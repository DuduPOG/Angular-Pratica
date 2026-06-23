from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from backend.views import ItemCrudViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="CRUD API",
        default_version='v1',
        description="Documentação da API do CRUD",
        terms_of_service="https://www.google.com",
        contact=openapi.Contact(email="[EMAIL_ADDRESS]"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = routers.DefaultRouter()
router.register(r'itens', ItemCrudViewSet, basename='item')

urlpatterns = [
    path('admin/', admin.site.urls),

    # ── CRUD endpoints ────────────────────────────────────────────────────────
    path('api/', include('backend.urls')),
    path('api/signup/', ItemCrudViewSet.as_view({'post': 'signup'}), name='signup'),
    path('api/login/', ItemCrudViewSet.as_view({'post': 'login'}), name='login'),
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # ── JWT auth ──────────────────────────────────────────────────────────────
    # POST /api/auth/token/         → {access, refresh}  (login)
    # POST /api/auth/token/refresh/ → {access}           (renovar access)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
