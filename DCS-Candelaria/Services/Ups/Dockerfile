FROM python:3.10.11-alpine3.16

ENV TZ=America/Santiago

WORKDIR /app

COPY . .

RUN pip install -r requirements.services.txt

CMD ["python", "main.py"]
