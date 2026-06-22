from django.db import models

DEFAULT_IMAGE = (
    'https://static.wikia.nocookie.net/naruto/images/c/cf/'
    'S%C3%ADmbolo_MS_Shisui.svg/revision/latest'
    '?cb=20121117225358&path-prefix=pt-br'
)


class ItemCrud(models.Model):
    """
    Modelo central do CRUD.

    Os nomes dos campos usam snake_case (convenção Django).
    O serializer expõe os campos em camelCase para o frontend Angular.
    """
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    imagem_padrao = models.CharField(max_length=500, default=DEFAULT_IMAGE)
    foto = models.CharField(max_length=500, blank=True, default='')
    trabalho = models.BooleanField(default=False)
    nota = models.FloatField(default=0.0)

    class Meta:
        db_table = 'item_crud'
        ordering = ['id']
        verbose_name = 'Item CRUD'
        verbose_name_plural = 'Itens CRUD'

    def __str__(self) -> str:
        return self.nome
