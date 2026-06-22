from rest_framework import serializers
from .models import ItemCrud, DEFAULT_IMAGE


class ItemCrudSerializer(serializers.ModelSerializer):
    """
    Serializer com mapeamento explícito de camelCase (Angular) → snake_case (Django).

    O frontend Angular usa:
      imagemPadrao  →  imagem_padrao no banco
    Todos os outros campos já coincidem entre as convenções.
    """
    imagemPadrao = serializers.CharField(
        source='imagem_padrao',
        required=False,
        allow_blank=True,
        default='',
    )

    class Meta:
        model = ItemCrud
        fields = [
            'id',
            'nome',
            'descricao',
            'imagemPadrao',
            'foto',
            'trabalho',
            'nota',
        ]

    def validate_imagemPadrao(self, value: str) -> str:
        """Se o frontend enviar string vazia, usa a imagem padrão do sistema."""
        return value if value else DEFAULT_IMAGE

    def create(self, validated_data: dict) -> ItemCrud:
        return ItemCrud.objects.create(**validated_data)

    def update(self, instance: ItemCrud, validated_data: dict) -> ItemCrud:
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
