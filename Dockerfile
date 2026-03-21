FROM python:3.11-slim

WORKDIR /app

COPY api/ api/
COPY data/cv.yaml data/cv.yaml
COPY data/cv.pdf data/cv.pdf

RUN pip install --no-cache-dir fastapi uvicorn[standard] pyyaml

EXPOSE 8080

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]
