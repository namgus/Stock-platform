from .views import *
from django.urls import path, include

urlpatterns = [
    path("hello/", hello_api),
    path("price/", price_api),
    path("debate/", debate_api),
    path("predict/", predict_api),
    path("financial/", financial_api),
    path("comment/", comment_api),
]