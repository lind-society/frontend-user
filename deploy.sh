#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# ----------------------------
# Configuration
# ----------------------------

# Docker Hub credentials (if not already logged in)
# DOCKER_USERNAME="your_dockerhub_username"
# DOCKER_PASSWORD="your_dockerhub_password"



# Docker Compose file (default is docker-compose.yml)
COMPOSE_FILE="docker-compose.yml"

# Names of the images to remove (space-separated if multiple)
IMAGES_TO_REMOVE=("azarnuzy/azarnuzy/landing_page:latest")

# ----------------------------
# Functions
# ----------------------------

# Function to display info messages
echo_info() {
    echo -e "\033[1;34m[INFO]\033[0m $1"
}

# Function to display error messages
echo_error() {
    echo -e "\033[1;31m[ERROR]\033[0m $1" >&2
}

# Function to log into Docker Hub
docker_login() {
    echo_info "Logging into Docker Hub..."
    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
}

# Function to stop and remove containers
stop_containers() {
    echo_info "Stopping and removing Docker containers..."
    docker compose -f "$COMPOSE_FILE" down
}

# Function to remove Docker images
remove_images() {
    for IMAGE in "${IMAGES_TO_REMOVE[@]}"; do
        echo_info "Removing Docker image: $IMAGE"
        # Force remove the image; continue if the image does not exist
        docker rmi -f "$IMAGE" || echo_error "Image $IMAGE could not be removed or does not exist."
    done
}

# Function to pull latest images from Docker Hub
pull_images() {
    echo_info "Pulling latest images from Docker Hub..."
    docker compose -f "$COMPOSE_FILE" pull
}

# Function to start containers
start_containers() {
    echo_info "Starting Docker containers..."
    docker compose -f "$COMPOSE_FILE" up -d
}

# ----------------------------
# Script Execution
# ----------------------------


# Optional: Log into Docker Hub (uncomment if needed)
# docker_login

# Stop and remove existing containers
stop_containers

# Remove specified Docker images
remove_images

# Pull the latest images from Docker Hub
pull_images

# Start containers with the latest images
start_containers

echo_info "Deployment completed successfully!"
