#!/bin/bash

# Create styles directory if it doesn't exist
mkdir -p "/Users/shawnlung/Documents/GitHub/Meditation_Space/styles"

# Move avatar.css from css to styles directory
if [ -f "/Users/shawnlung/Documents/GitHub/Meditation_Space/css/avatar.css" ]; then
    cp "/Users/shawnlung/Documents/GitHub/Meditation_Space/css/avatar.css" "/Users/shawnlung/Documents/GitHub/Meditation_Space/styles/avatar.css"
    echo "Copied avatar.css to styles directory"
else
    # Create new file if it doesn't exist
    cat > "/Users/shawnlung/Documents/GitHub/Meditation_Space/styles/avatar.css" << EOL
/* Avatar styles */
.avatar-selection {
    margin: 20px 0;
}

.avatar-options {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.avatar-option {
    text-align: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.avatar-option.selected {
    background-color: rgba(106, 141, 115, 0.2);
}

.avatar-preview {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 10px;
    border: 3px solid #6a8d73;
}

.avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
EOL
    echo "Created new avatar.css in styles directory"
fi

echo "Directory structure updated successfully!"
