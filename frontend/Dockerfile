FROM node:14.17.0-alpine
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install
RUN npm audit fix --force
COPY . ./
EXPOSE 3000