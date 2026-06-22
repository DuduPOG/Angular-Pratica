from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemCrudViewSet

router = DefaultRouter()
router.register(r'items', ItemCrudViewSet, basename='item-crud')

urlpatterns = [
    path('', include(router.urls)),
]
