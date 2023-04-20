FROM python:3.8.8-alpine
ENV PYTHONUNBUFFERED 1 

RUN apt-get -y update 
RUN apt-get -y install vim 

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000