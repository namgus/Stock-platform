# Personalized Stock Portfolio Recommendation Platform

<!-- ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white) -->
![Django](https://img.shields.io/badge/DJANGO-092E20?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon%20aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![Github Action](https://github.com/Nam-gu/Stock-platform/actions/workflows/test-build.yml/badge.svg)
[![codecov](https://codecov.io/gh/Nam-gu/Stock-platform/branch/main/graph/badge.svg?token=9Q1TXUD1ZB)](https://codecov.io/gh/Nam-gu/Stock-platform)

개인 맞춤형 주식 포트폴리오 추천 플랫폼 


<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://user-images.githubusercontent.com/28288186/233266865-c10ae364-06bd-4b04-ad91-fa9f18b905aa.png" width="80%" height="80%">

### 개요
* 주식 시장에서 다양한 정보를 수집하고 이를 투자에 어떻게 활용하는지는 중요하다. 양질의 정보를 제공하기 위해 웹플랫폼을 개발하여 서비스한다.
* 사람의 심리를 고려한 지표를 제공함으로써 시장 참여자들의 심리를 파악하는데 도움을 줄 수 있다.
* 심리를 반영할 수 있는 감성분석 지표, 기존의 재무제표 지표들을 바탕으로 개인 맞춤 포트폴리오를 추천해준다.

### Intro
* It is important to collect various information from the stock market and use it for investment. Web platforms are developed and serviced to provide quality information.
* It can help to grasp the psychology of market participants by providing indicators that consider human psychology.
* Based on emotional analysis indicators that can reflect psychology and existing financial statements indicators, personalized portfolios are recommended.


<!-- ABOUT System Configuration -->
## System Configuration

<img src="https://user-images.githubusercontent.com/28288186/233267215-c148203e-f9b3-45e1-8130-fc21bb29f49d.png" width="90%" height="90%">


|   구성    |  Tools  |설명|
|:---------:|:------:|---|
| Frontend | React  |사용자들이 원하는 지표(감성분석, PER, PBR, EPS 등)에 맞춰 동일 비중 포트폴리오(Equally Weighted Portfolio)와 가치 가중 포트폴리오(Value Weighted Portfolio)를 제공한다.|
|Backend   | Django REST framework |7개의 API를 제공한다. 실시간 주가, 예상 주가, 네이버 증권 종목토론실을 KR-Finbert를 이용해 분석한 데이터, 재무제표, 토론방 등 여러 데이터를 Front-end에서 사용할 수 있다.|
|DB         | RDS(MySQL) | 주식 별 토론방의 데이터를 저장한다.|
|CI/CD      | GitHub Actions / AWS CodeDeploy | 테스트와 배포를 자동화한다.|


<!-- ABOUT Web Site -->
## Platform Features
### 1. 메인 페이지

<img width="45%" height="45%" src="https://user-images.githubusercontent.com/28288186/233275586-0ec8c99f-9a98-4261-9b69-25c75d945760.png"> <img width="46%" height="46%" src="https://user-images.githubusercontent.com/28288186/233275615-c453b8be-fe6b-42bd-9ce0-fc5d2d6bf352.png">

* 여러 지표들(감성분석, BPS, PER, PBR, EPS, DIV, DPS) 중에서 사용자가 원하는 지표에 따라 해당 버튼을 클릭하면 포트폴리오를 제공한다.
* 포트폴리오 아래에서는 구체적인 기업별 정보를 제공한다.    

### 2. 기업별 세부정보 페이지
<img width="48%" height="48%" src="https://user-images.githubusercontent.com/28288186/233276453-a9364380-632c-406c-86e0-5d2593838bdb.png"> <img width="45%" height="45%" src="https://user-images.githubusercontent.com/28288186/233277131-e4f13a45-a3ae-4b2f-a8e0-11676d69312f.png">

* 기업별 정보에서 구체적으로 보고 싶은 기업을 클릭하면 세부 정보 페이지로 이동한다.
* 현재 주가와 예상 주가를 확인할 수 있다.
* 주가 데이터와 네이버증권 종목토론실을 KR-Finbert를 이용해 감성분석한 데이터를 LSTM을 이용해 학습한 모델을 통해 예상주가를 제공한다.
> 모델은 아래 사이트에서 확인할 수 있다.    
> <https://github.com/Nam-gu/Personalized-stock-portfolio-model>   
* 재무제표, 네이버 종목토론실 실시간 감성분석, 토론방 기능을 제공한다.

