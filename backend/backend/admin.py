from django.contrib import admin
from .models import ItemCrud


@admin.register(ItemCrud)
class ItemCrudAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'nota', 'trabalho')
    list_filter = ('trabalho',)
    search_fields = ('nome', 'descricao')
