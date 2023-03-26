from django.urls import path
from .views import (
    hello_api,
    price_api,
    debate_api,
    predict_api,
    financial_api,
    comment_api,
)

urlpatterns = [
    path("hello", hello_api),
    path("price", price_api),
    path("debate", debate_api),
    path("predict", predict_api),
    path("financial", financial_api),
    path("comment", comment_api),
]