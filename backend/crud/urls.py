from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ── JWT auth ──────────────────────────────────────────────────────────────
    # POST /api/auth/token/         → {access, refresh}  (login)
    # POST /api/auth/token/refresh/ → {access}           (renovar access)
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ── CRUD endpoints ────────────────────────────────────────────────────────
    path('api/', include('backend.urls')),
]
