# Generated by Django 4.1.7 on 2023-03-26 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Comment",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("code", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("comments", models.TextField()),
            ],
        ),
    ]
