from rest_framework import serializers
from .models import ItemCrud, DEFAULT_IMAGE


class ItemCrudSerializer(serializers.ModelSerializer):
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

    def validate_imagemPadrao(self, value):
        return value if value else DEFAULT_IMAGE

    def create(self, validated_data):
        return ItemCrud.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
