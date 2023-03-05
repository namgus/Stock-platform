from django.urls import path, include
from .views import HelloAPI

urlpatterns = [
    path("hello/", HelloAPI),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("stock/", include("stock.urls")),
]
