from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ItemCrud
from .serializers import ItemCrudSerializer

class ItemCrudViewSet(viewsets.ModelViewSet):
    queryset = ItemCrud.objects.all()
    serializer_class = ItemCrudSerializer
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
