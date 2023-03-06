from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from pykrx import stock

from . import serializer, models

@api_view(['GET'])
def HelloAPI(request):
    return Response("hello world!")


@api_view(['GET'])
def PriceAPI(request):
    df = stock.get_market_ohlcv("20230305", "20240221", "005930")
    price = int(df.tail(2)['시가'])

    serial = serializer.StockSerializer(models.Stock(price=price))
    return Response(serial.data)

