FROM python:3.9-slim

WORKDIR /app

# Install dependencies first (cached layer)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "80"]