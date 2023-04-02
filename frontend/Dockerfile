FROM node:14.21.3-alpine3.17
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 3000