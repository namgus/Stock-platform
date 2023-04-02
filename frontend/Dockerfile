FROM node:14.17.0
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 3000