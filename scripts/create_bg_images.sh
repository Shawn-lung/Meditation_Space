#!/bin/bash

# Base directory
BASE_DIR="/Users/shawnlung/Documents/GitHub/Meditation_Space/assets/images"

# Create base directory if it doesn't exist
mkdir -p "$BASE_DIR"

# Create placeholder SVG for meditation background
cat > "$BASE_DIR/meditation-bg.jpg.svg" << EOL
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#e5ebe7"/>
  <circle cx="600" cy="400" r="200" fill="#d0e0d5" opacity="0.7"/>
  <circle cx="300" cy="600" r="150" fill="#c0d0c5" opacity="0.5"/>
  <circle cx="900" cy="200" r="180" fill="#c0d0c5" opacity="0.5"/>
</svg>
EOL

# Create placeholder SVG for meditation map
cat > "$BASE_DIR/meditation-map.jpg.svg" << EOL
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="1000" fill="#f0f5f2"/>
  <!-- Blue classroom areas -->
  <rect x="100" y="100" width="200" height="200" fill="#9bafd9" opacity="0.7" rx="20"/>
  <rect x="700" y="100" width="200" height="200" fill="#9bafd9" opacity="0.7" rx="20"/>
  <!-- Green yoga mat areas -->
  <rect x="400" y="400" width="200" height="200" fill="#6a8d73" opacity="0.7" rx="100"/>
  <rect x="100" y="700" width="200" height="200" fill="#6a8d73" opacity="0.7" rx="100"/>
  <rect x="700" y="700" width="200" height="200" fill="#6a8d73" opacity="0.7" rx="100"/>
</svg>
EOL

echo "Background SVG files created successfully. Convert these to JPG as needed."
