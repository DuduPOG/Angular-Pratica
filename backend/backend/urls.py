from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemCrudViewSet
from .auth_views import SignupView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView

router=DefaultRouter()
router.register(r'items',ItemCrudViewSet,basename='items')

urlpatterns=[
 path('',include(router.urls)),
 path('signup/',SignupView.as_view()),
 path('token/',LoginView.as_view()),
 path('token/refresh/',TokenRefreshView.as_view()),
]
