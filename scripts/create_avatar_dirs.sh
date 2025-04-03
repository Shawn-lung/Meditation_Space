#!/bin/bash

# Base directory
BASE_DIR="/Users/shawnlung/Documents/GitHub/Meditation_Space/assets/images/avatars"

# Create base directory if it doesn't exist
mkdir -p "$BASE_DIR"

# Create category directories
mkdir -p "$BASE_DIR/default"
mkdir -p "$BASE_DIR/nature"
mkdir -p "$BASE_DIR/spiritual"
mkdir -p "$BASE_DIR/abstract"

echo "Avatar directory structure created successfully!"
