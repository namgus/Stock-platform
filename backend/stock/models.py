from django.db import models

class Stock(models.Model):
    price = models.IntegerField()