#!/bin/bash

# Base directory
BASE_DIR="/Users/shawnlung/Documents/GitHub/Meditation_Space/assets/images/avatars"

# Create base directory if it doesn't exist
mkdir -p "$BASE_DIR"

# Use placeholder images or create simple SVG files for avatars
cat > "$BASE_DIR/default.png.svg" << EOL
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#6a8d73"/>
  <circle cx="100" cy="80" r="40" fill="#f5f5f5"/>
  <rect x="60" y="130" width="80" height="40" rx="20" fill="#f5f5f5"/>
</svg>
EOL

cat > "$BASE_DIR/lotus.png.svg" << EOL
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#d1a9a9"/>
  <circle cx="100" cy="100" r="50" fill="#f5f5f5"/>
  <circle cx="100" cy="100" r="30" fill="#d1a9a9"/>
  <circle cx="100" cy="100" r="15" fill="#f5f5f5"/>
</svg>
EOL

cat > "$BASE_DIR/zen.png.svg" << EOL
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#9bafd9"/>
  <circle cx="100" cy="70" r="30" fill="#f5f5f5"/>
  <path d="M60,140 Q100,180 140,140" stroke="#f5f5f5" stroke-width="10" fill="none"/>
</svg>
EOL

cat > "$BASE_DIR/guru.png.svg" << EOL
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#d9ad9b"/>
  <circle cx="100" cy="70" r="30" fill="#f5f5f5"/>
  <rect x="70" y="110" width="60" height="60" fill="#f5f5f5"/>
</svg>
EOL

echo "Avatar SVG files created successfully. Convert these to PNG as needed."
