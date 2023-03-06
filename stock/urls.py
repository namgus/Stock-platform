from .views import HelloAPI, PriceAPI
from django.urls import path, include

urlpatterns = [
    path("hello/", HelloAPI),
    path("price/", PriceAPI),
]