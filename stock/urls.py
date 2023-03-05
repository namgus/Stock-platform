from .views import HelloAPI
from django.urls import path, include

urlpatterns = [
    path("hello/", HelloAPI),
]