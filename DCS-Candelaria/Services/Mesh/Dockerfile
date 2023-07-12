FROM python:3.10.11-slim-buster

ENV TZ=America/Santiago

WORKDIR /app

COPY . .

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y build-essential freetds-dev && \
    pip install --upgrade pip && \
    pip install -r requirements.services.txt

CMD ["python", "main.py"]
