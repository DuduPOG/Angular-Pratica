from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ItemCrud
from .serializers import ItemCrudSerializer


class ItemCrudViewSet(viewsets.ModelViewSet):
    """
    ViewSet com autenticação JWT obrigatória.

    Todos os endpoints exigem header: Authorization: Bearer <access_token>

    Rotas (via DefaultRouter):
      GET    /api/items/         → list
      POST   /api/items/         → create
      GET    /api/items/{id}/    → retrieve
      PUT    /api/items/{id}/    → update
      PATCH  /api/items/{id}/    → partial_update
      DELETE /api/items/{id}/    → destroy
    """
    queryset = ItemCrud.objects.all()
    serializer_class = ItemCrudSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
