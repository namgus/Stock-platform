from .views import HelloAPI, PriceAPI, DebateAPI
from django.urls import path, include

urlpatterns = [
    path("hello/", HelloAPI),
    path("price/", PriceAPI),
    path("debate/", DebateAPI),
]