#!/bin/bash

echo "Setting up Meditation Space assets..."

# Create directory structure if not exists
mkdir -p assets/images/avatars
mkdir -p assets/audio
mkdir -p assets/video

# Generate a simple map image
echo "Generating map image..."
cat > assets/images/map.png << EOL
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="100%" height="100%" fill="#f0f8ff"/>
  
  <!-- Grid lines -->
  <g stroke="#ccc" stroke-width="1">
    <!-- Vertical lines -->
    <line x1="100" y1="0" x2="100" y2="800"/>
    <line x1="200" y1="0" x2="200" y2="800"/>
    <line x1="300" y1="0" x2="300" y2="800"/>
    <line x1="400" y1="0" x2="400" y2="800"/>
    <line x1="500" y1="0" x2="500" y2="800"/>
    <line x1="600" y1="0" x2="600" y2="800"/>
    <line x1="700" y1="0" x2="700" y2="800"/>
    <line x1="800" y1="0" x2="800" y2="800"/>
    <line x1="900" y1="0" x2="900" y2="800"/>
    <line x1="1000" y1="0" x2="1000" y2="800"/>
    <line x1="1100" y1="0" x2="1100" y2="800"/>
    
    <!-- Horizontal lines -->
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="500" x2="1200" y2="500"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="0" y1="700" x2="1200" y2="700"/>
  </g>
  
  <!-- Classroom areas (blue) -->
  <rect x="100" y="100" width="200" height="150" fill="rgba(100,149,237,0.3)" stroke="#6495ED"/>
  <rect x="400" y="100" width="200" height="150" fill="rgba(100,149,237,0.3)" stroke="#6495ED"/>
  
  <!-- Yoga areas (green) -->
  <rect x="100" y="400" width="100" height="100" fill="rgba(144,238,144,0.3)" stroke="#90EE90"/>
  <rect x="300" y="400" width="100" height="100" fill="rgba(144,238,144,0.3)" stroke="#90EE90"/>
  <rect x="500" y="400" width="100" height="100" fill="rgba(144,238,144,0.3)" stroke="#90EE90"/>
  
  <!-- Obstacles (gray) -->
  <rect x="150" y="280" width="100" height="40" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  <rect x="450" y="280" width="100" height="40" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  <rect x="700" y="150" width="40" height="200" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  
  <!-- Wall boundaries -->
  <rect x="0" y="0" width="1200" height="20" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  <rect x="0" y="0" width="20" height="800" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  <rect x="0" y="780" width="1200" height="20" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
  <rect x="1180" y="0" width="20" height="800" fill="rgba(169,169,169,0.5)" stroke="#A9A9A9"/>
</svg>
EOL

# Create a placeholder avatar images for each type
echo "Generating avatar images..."
for avatar in default lotus zen guru; do
  cat > "assets/images/avatars/${avatar}.png" << EOL
<svg width="128" height="192" xmlns="http://www.w3.org/2000/svg">
  <!-- Character spritesheet with 4 directions and 4 animation frames -->
  <style>
    .default { fill: #3498db; }
    .lotus { fill: #e74c3c; }
    .zen { fill: #2ecc71; }
    .guru { fill: #9b59b6; }
    .face { fill: #f5f5f5; }
    .hat { fill: #34495e; }
  </style>
  
  <!-- Row 1: Down -->
  <g transform="translate(0,0)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(32,0)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(64,0)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(96,0)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  
  <!-- Row 2: Left -->
  <g transform="translate(0,48)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(32,48)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(64,48)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(96,48)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  
  <!-- Row 3: Right -->
  <g transform="translate(0,96)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(32,96)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(64,96)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(96,96)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  
  <!-- Row 4: Up -->
  <g transform="translate(0,144)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(32,144)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(64,144)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
  <g transform="translate(96,144)">
    <rect class="${avatar}" x="0" y="0" width="32" height="48"/>
    <rect class="face" x="8" y="10" width="16" height="8"/>
    ${avatar == "lotus" || avatar == "guru" ? '<rect class="hat" x="6" y="0" width="20" height="5"/>' : ''}
  </g>
</svg>
EOL
done

# Create placeholder video files
echo "Creating placeholder video files..."
mkdir -p assets/video
cat > assets/video/beginner-meditation.mp4 << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <rect width="640" height="360" fill="#000"/>
  <text x="320" y="180" font-family="Arial" font-size="24" fill="#fff" text-anchor="middle">
    Beginner Meditation Video Placeholder
  </text>
</svg>
EOL

cat > assets/video/advanced-meditation.mp4 << EOL
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <rect width="640" height="360" fill="#000"/>
  <text x="320" y="180" font-family="Arial" font-size="24" fill="#fff" text-anchor="middle">
    Advanced Meditation Video Placeholder
  </text>
</svg>
EOL

# Create placeholder audio files
echo "Creating placeholder audio files..."
mkdir -p assets/audio
for audio in calm-music nature-sounds ocean-waves; do
  touch "assets/audio/${audio}.mp3"
done

echo "Asset setup complete!"
