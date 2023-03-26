from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from pykrx import stock
import datetime

import json
from django.http import JsonResponse

from . import serializer, models
from .sentiment_analysis import get_naver_finance_board
from .load_model import load_model, limit_stock_price

@api_view(['GET'])
def hello_api(request):
    return Response("hello world!")


@api_view(['GET'])
def price_api(request):
    code = request.GET.get('code', "005930")

    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=7)
    
    df = stock.get_market_ohlcv(start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d"), code)

    price = df.iloc[-1]['종가']

    return Response({'price': price})


@api_view(['GET'])
def debate_api(request):
    code = request.GET.get('code', "005930")
    page = request.GET.get('page', "1")

    result = get_naver_finance_board(code, page).to_json(orient='records')

    return JsonResponse(json.loads(result), safe = False)


@api_view(['GET'])
def predict_api(request):
    code = request.GET.get('code', "005930")

    # Find price
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=7)
    df = stock.get_market_ohlcv(start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d"), code)
    close_price = int(df.iloc[-1]['종가'])

    # Sentiment
    sentiment_analysis = float("0")

    # Predicting price
    predict_price = load_model(close_price, sentiment_analysis)
    
    # Limit upper and lower
    limit_stock_price(predict_price, close_price, lower_limit=0.9, upper_limit=1.1)

    return Response({'predict_price': predict_price})
