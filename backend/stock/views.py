from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from pykrx import stock
import json
from django.http import JsonResponse

from . import serializer, models
from .sentiment_analysis import get_naver_finance_board

@api_view(['GET'])
def HelloAPI(request):
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
def DebateAPI(request):
    code = request.GET.get('code', "005930")
    page = request.GET.get('page', "1")

    result = get_naver_finance_board(code, page).to_json(orient='records')

    return JsonResponse(json.loads(result), safe = False)
