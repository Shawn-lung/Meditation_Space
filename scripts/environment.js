class MeditationEnvironment {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    // Set canvas size to match container
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Initialize map elements
    this.mapWidth = 1200;
    this.mapHeight = 800;
    this.character = null;

    // Map areas
    this.areas = [
      {
        type: "classroom",
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        name: "Beginner Meditation",
        videoId: "beginner-meditation",
        youtubeId: "GszmHs8qPFE" // Added YouTube ID
      },
      {
        type: "classroom",
        x: 400,
        y: 100,
        width: 200,
        height: 150,
        name: "Advanced Meditation",
        videoId: "advanced-meditation",
      },
      {
        type: "yoga",
        x: 100,
        y: 400,
        width: 100,
        height: 100,
        name: "Calm Space",
        audioId: "calm-music",
      },
      {
        type: "yoga",
        x: 300,
        y: 400,
        width: 100,
        height: 100,
        name: "Nature Space",
        audioId: "nature-sounds",
      },
      {
        type: "yoga",
        x: 500,
        y: 400,
        width: 100,
        height: 100,
        name: "Ocean Space",
        audioId: "ocean-waves",
      },
    ];

    // Obstacles (walls, furniture)
    this.obstacles = [
      { x: 0, y: 0, width: this.mapWidth, height: 20 }, // Top wall
      { x: 0, y: 0, width: 20, height: this.mapHeight }, // Left wall
      { x: 0, y: this.mapHeight - 20, width: this.mapWidth, height: 20 }, // Bottom wall
      { x: this.mapWidth - 20, y: 0, width: 20, height: this.mapHeight }, // Right wall
    ];

    // Add some furniture as obstacles
    this.obstacles = this.obstacles.concat([
      { x: 150, y: 280, width: 100, height: 40 }, // Table
      { x: 450, y: 280, width: 100, height: 40 }, // Another table
      { x: 700, y: 150, width: 40, height: 200 }, // Bookshelf
    ]);

    // Active media
    this.activeVideo = null;
    this.activeAudio = null;

    // Background image
    this.loadMapImage();

    // Keyboard state
    this.keys = {};

    // Initialize keyboard listeners
    this.initKeyboardControls();
  }

  resizeCanvas() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
  }

  initCharacter(avatarType = "default") {
    // Create a character at the center of the visible area
    this.character = new Character(
      this,
      this.canvas.width / 2,
      this.canvas.height / 2,
      avatarType
    );
  }

  initKeyboardControls() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;

      // Stop character movement when keys are released
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(e.key)
      ) {
        if (this.character) this.character.stopMoving();
      }
    });
  }

  isValidPosition(x, y, width, height) {
    // Check map boundaries
    if (
      x < 0 ||
      y < 0 ||
      x + width > this.mapWidth ||
      y + height > this.mapHeight
    ) {
      return false;
    }

    // Check collision with obstacles
    for (const obstacle of this.obstacles) {
      if (this.checkCollision({ x, y, width, height }, obstacle)) {
        return false;
      }
    }

    return true;
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  checkAreaInteractions() {
    if (!this.character) return;

    // Character hitbox for interaction
    const charBox = {
      x: this.character.x,
      y: this.character.y,
      width: this.character.width,
      height: this.character.height,
    };

    let inArea = false;

    // Check each area for interaction
    for (const area of this.areas) {
      if (this.checkCollision(charBox, area)) {
        inArea = true;

        // Handle area interaction based on type
        if (area.type === "classroom") {
          this.handleClassroomInteraction(area);
        } else if (area.type === "yoga") {
          this.handleYogaInteraction(area);
        }

        // Show area name
        document.getElementById("area-name").textContent = area.name;
        document.getElementById("area-info").style.display = "block";
        break;
      }
    }

    if (!inArea) {
      // Hide area info when not in any area
      document.getElementById("area-info").style.display = "none";

      // Stop any active media if we left the area
      this.stopActiveMedia();
    }
  }

  handleClassroomInteraction(classroom) {
    // If we have an active video that's different, stop it
    if (this.activeVideo && this.activeVideo !== classroom.videoId) {
      this.stopActiveMedia();
    }

    // If no video is active, start one
    if (!this.activeVideo) {
      this.activeVideo = classroom.videoId;

      // Show the video modal with the specific content
      const videoModal = document.getElementById("video-modal");
      const videoContent = document.getElementById("video-content");

      // Check if we have a YouTube ID
      if (classroom.youtubeId) {
        // Set the YouTube embed source
        videoContent.innerHTML = `
          <h2>${classroom.name}</h2>
          <div class="youtube-container">
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/${classroom.youtubeId}" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <button id="close-video">Exit Classroom</button>
        `;
      } else {
        // Set the local video source
        videoContent.innerHTML = `
          <h2>${classroom.name}</h2>
          <video controls autoplay width="100%">
            <source src="assets/video/${classroom.videoId}.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <button id="close-video">Exit Classroom</button>
        `;
      }

      // Show the modal
      videoModal.style.display = "block";

      // Add event listener to close button
      document.getElementById("close-video").addEventListener("click", () => {
        this.stopActiveMedia();
      });
    }
  }

  handleYogaInteraction(yogaArea) {
    // If we have active audio that's different, stop it
    if (this.activeAudio && this.activeAudio !== yogaArea.audioId) {
      this.stopActiveMedia();
    }

    // If no audio is playing, start it
    if (!this.activeAudio) {
      this.activeAudio = yogaArea.audioId;

      // Create audio element if it doesn't exist
      let audioElement = document.getElementById("background-audio");
      if (!audioElement) {
        audioElement = document.createElement("audio");
        audioElement.id = "background-audio";
        audioElement.loop = true;
        document.body.appendChild(audioElement);
      }

      // Set audio source and play
      audioElement.src = `assets/audio/${yogaArea.audioId}.mp3`;
      audioElement.play();

      // Show audio controls
      document.getElementById("audio-controls").style.display = "block";
      document.getElementById("audio-name").textContent = yogaArea.name;
    }
  }

  stopActiveMedia() {
    // Stop video if active
    if (this.activeVideo) {
      document.getElementById("video-modal").style.display = "none";
      this.activeVideo = null;
    }

    // Stop audio if active
    if (this.activeAudio) {
      const audioElement = document.getElementById("background-audio");
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      // Hide audio controls
      document.getElementById("audio-controls").style.display = "none";

      this.activeAudio = null;
    }
  }

  update() {
    // Handle keyboard input
    if (this.character) {
      if (
        (this.keys["ArrowUp"] || this.keys["w"]) &&
        !this.keys["ArrowDown"] &&
        !this.keys["s"]
      ) {
        this.character.move("up");
      } else if (
        (this.keys["ArrowDown"] || this.keys["s"]) &&
        !this.keys["ArrowUp"] &&
        !this.keys["w"]
      ) {
        this.character.move("down");
      } else if (
        (this.keys["ArrowLeft"] || this.keys["a"]) &&
        !this.keys["ArrowRight"] &&
        !this.keys["d"]
      ) {
        this.character.move("left");
      } else if (
        (this.keys["ArrowRight"] || this.keys["d"]) &&
        !this.keys["ArrowLeft"] &&
        !this.keys["a"]
      ) {
        this.character.move("right");
      } else {
        this.character.stopMoving();
      }

      // Update character animation
      this.character.update();
    }

    // Check for area interactions
    this.checkAreaInteractions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the map background
    if (this.mapLoaded) {
      if (this.useFallbackMap) {
        // Draw a fallback colored background if the image failed to load
        this.ctx.fillStyle = "#f0f0f0";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines for visual reference
        this.ctx.strokeStyle = "#cccccc";
        this.ctx.lineWidth = 1;
        const gridSize = 50;

        for (let x = 0; x < this.canvas.width; x += gridSize) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.lineTo(x, this.canvas.height);
          this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += gridSize) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, y);
          this.ctx.lineTo(this.canvas.width, y);
          this.ctx.stroke();
        }
      } else {
        // Draw the actual map image if it loaded successfully
        this.ctx.drawImage(
          this.mapImage,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      }
    }

    // Draw areas
    this.areas.forEach((area) => {
      // Different colors for different area types
      this.ctx.fillStyle =
        area.type === "classroom"
          ? "rgba(100, 149, 237, 0.3)" // Classroom - blue
          : "rgba(144, 238, 144, 0.3)"; // Yoga - green

      this.ctx.fillRect(area.x, area.y, area.width, area.height);

      // Draw area labels
      this.ctx.fillStyle = "#333";
      this.ctx.font = "14px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        area.name,
        area.x + area.width / 2,
        area.y + area.height / 2
      );
    });

    // Draw obstacles for debugging
    this.ctx.fillStyle = "rgba(169, 169, 169, 0.5)"; // Gray for obstacles
    this.obstacles.forEach((obstacle) => {
      this.ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
      );
    });

    // Draw character
    if (this.character) {
      this.character.draw(this.ctx);
    }
  }

  drawFallbackMap() {
    // Create a simple colored background as fallback
    this.backgroundImage = null;
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  start() {
    this.gameLoop();
  }

  loadMapImage() {
    const mapImage = new Image();
    mapImage.onload = () => {
      this.mapImage = mapImage;
      this.mapLoaded = true;
    };
    mapImage.onerror = () => {
      console.log("Could not load map image. Using fallback.");
      // Create a fallback colored rectangle instead of using a broken image
      this.useFallbackMap = true;
      this.mapLoaded = true; // Consider the map as "loaded" with the fallback
    };
    mapImage.src = "assets/images/map.png";
  }
}

// Export the MeditationEnvironment class
window.MeditationEnvironment = MeditationEnvironment;

function loadImageWithFallback(src, fallbackColor = "#cccccc") {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}, using fallback`);
      // Create a canvas element for a fallback colored rectangle
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = fallbackColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      resolve(canvas);
    };
    img.src = src;
  });
}
