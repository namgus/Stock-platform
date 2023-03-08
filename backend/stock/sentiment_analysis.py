import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline


# pre-trained model for sentiment analysis
tokenizer = AutoTokenizer.from_pretrained("snunlp/KR-FinBert-SC")
model = AutoModelForSequenceClassification.from_pretrained("snunlp/KR-FinBert-SC")

labels = ['Negative', 'Neutral', 'Positive']

sentiment_analysis = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer, return_all_scores=True)

def get_sentiment_analysis(text):
    # Classify the sentiment of the input sentence
    if len(text) > 512:
        text = text[:512] # restrict model input 512
    result = sentiment_analysis(text)

    max_score_label = max(result[0], key=lambda x: x['score'])['label']

    # Return highest confidence score label
    return max_score_label


def get_naver_finance_board(codes, page_num):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
    }

    result = []

    url = f"https://finance.naver.com/item/board.naver?code={codes}&page={page_num}"

    response = requests.get(url, headers=headers)
    html = response.content
    soup = BeautifulSoup(html.decode('euc-kr', 'replace'), 'html.parser')
    table = soup.find('table', {'class': 'type2'})
    rows = table.select('tbody > tr')

    for row in rows[2:]:
        cols = row.select('td')
        if len(cols) >= 6:
            date = cols[0].select_one('span').get_text(strip=True)
            title = cols[1].select_one('a').get('title').strip()
            views = cols[3].select_one('span').get_text(strip=True)
            upvote = cols[4].select_one('strong').get_text(strip=True)
            downvote = cols[5].select_one('strong').get_text(strip=True)
            result.append([date, title, views, upvote, downvote])

    df = pd.DataFrame(result, columns=['날짜', '제목', '조회', '공감', '비공감'])
    
    df['감성분석'] = df['제목'].apply(get_sentiment_analysis)

    print(df)

    return df
