FROM ubuntu:16.04

ARG DEBIAN_FRONTEND=noninteractive

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8 PYTHONUNBUFFERED=1 TZ=Asia/Seoul

RUN apt-get update && \
        apt-get install -y tzdata && \
        apt-get install -y software-properties-common && \
        add-apt-repository -y ppa:fkrull/deadsnakes && \
        apt-get update -y  && \
        apt-get install -y build-essential python3.6 python3.6-dev python3-pip && \

        python3.6 -m pip install pip --upgrade && \
        python3.6 -m pip install wheel && \
        apt-get -o Dpkg::Options::="--force-overwrite" install -y openjdk-9-jdk

WORKDIR /app
COPY ./ ./

RUN pip install --no-cache-dir -r requirements.txt