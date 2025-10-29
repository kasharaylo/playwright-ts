FROM mcr.microsoft.com/playwright:v1.53.0

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install --force
RUN npx playwright install