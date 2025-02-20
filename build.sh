#!/bin/bash

set -e

IMAGE_NAME="azarnuzy/landing_page:latest"
DOCKER_REPO="$IMAGE_NAME"
DOCKER_COMPOSE_FILE="docker-compose.yml"

echo "[INFO] Building for production..."
docker compose -f "$DOCKER_COMPOSE_FILE" down

echo "[INFO] Removing old production image..."
docker rmi -f $IMAGE_NAME || true

echo "[INFO] Building with production config..."
docker compose -f "$DOCKER_COMPOSE_FILE" build 

echo "[INFO] Starting production containers..."
# docker compose -f "$DOCKER_COMPOSE_FILE" up -d

echo "[INFO] Pushing production image..."
docker push $DOCKER_REPO

echo "[INFO] Production deployment completed!"