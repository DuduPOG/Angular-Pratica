from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies: list = []

    operations = [
        migrations.CreateModel(
            name='ItemCrud',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('nome', models.CharField(max_length=255)),
                ('descricao', models.TextField()),
                (
                    'imagem_padrao',
                    models.CharField(
                        default=(
                            'https://static.wikia.nocookie.net/naruto/images/c/cf/'
                            'S%C3%ADmbolo_MS_Shisui.svg/revision/latest'
                            '?cb=20121117225358&path-prefix=pt-br'
                        ),
                        max_length=500,
                    ),
                ),
                ('foto', models.CharField(blank=True, default='', max_length=500)),
                ('trabalho', models.BooleanField(default=False)),
                ('nota', models.FloatField(default=0.0)),
            ],
            options={
                'verbose_name': 'Item CRUD',
                'verbose_name_plural': 'Itens CRUD',
                'db_table': 'item_crud',
                'ordering': ['id'],
            },
        ),
    ]
