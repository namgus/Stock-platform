from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from pykrx import stock
import datetime

import json
from django.http import JsonResponse

from .models import Comment
from .serializer import CommentSerializer
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

    if df.empty:
        return Response({'error': 'No data available'}, status=status.HTTP_404_NOT_FOUND)
    
    price = df.iloc[-1]['종가']
    return Response({'price': price})


@api_view(['GET'])
def debate_api(request):
    code = request.GET.get('code', "005930")
    page = request.GET.get('page', "1")

    try:
        result = get_naver_finance_board(code, page)
    except AttributeError:
        return Response({'error': 'Invalid parameters'}, status=status.HTTP_404_NOT_FOUND)
    
    if result.empty:
        return Response({'error': 'No data available'}, status=status.HTTP_404_NOT_FOUND)

    result = result.to_json(orient='records')

    return JsonResponse(json.loads(result), safe = False)


@api_view(['GET'])
def predict_api(request):
    code = request.GET.get('code', "005930")

    # Find price
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=7)
    df = stock.get_market_ohlcv(start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d"), code)
    if df.empty:
        return Response({'error': 'No data available'}, status=status.HTTP_404_NOT_FOUND)
    close_price = int(df.iloc[-1]['종가'])

    # Sentiment
    sentiment_analysis = float("0")

    # Predicting price
    predict_price = load_model(close_price, sentiment_analysis)
    
    # Limit upper and lower
    predict_price = limit_stock_price(predict_price, close_price, lower_limit=0.95, upper_limit=1.05)

    return Response({'predict_price': predict_price})


@api_view(['GET'])
def financial_api(request):
    code = request.GET.get('code', '005930')
    start_date = datetime.datetime.now() - datetime.timedelta(days = 180)
    end_date = datetime.datetime.now()

    df = stock.get_market_fundamental(start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d"), code, freq="m")
    if df.empty:
        return Response({'error': 'No data available'}, status=status.HTTP_404_NOT_FOUND)
    
    result = df.to_json(orient='table')

    return JsonResponse(json.loads(result), safe = False)


@api_view(['GET', 'POST'])
def comment_api(request):
    if request.method == 'GET':
        code = request.GET.get('code', '005930')
        comments = Comment.objects.filter(code=code).values('created_at', 'comments')

        return Response(comments)

    elif request.method == "POST":
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)