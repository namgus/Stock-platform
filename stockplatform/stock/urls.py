from django.urls import path, include
from .views import HelloAPI

urlpatterns = [
    path("hello/", HelloAPI),
]
