class Character {
  constructor(scene, x, y, avatarType = "default") {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 48;
    this.speed = 3;
    this.direction = "down";
    this.moving = false;
    this.avatarType = avatarType;

    // Avatar colors and styles
    this.avatarStyles = {
      default: { color: "#3498db", hat: false },
      lotus: { color: "#e74c3c", hat: true },
      zen: { color: "#2ecc71", hat: false },
      guru: { color: "#9b59b6", hat: true },
    };

    // Load avatar image if needed
    this.image = new Image();
    this.imageLoaded = false;
    this.imageError = false;
    
    this.image.onload = () => {
      this.imageLoaded = true;
      this.imageError = false;
    };
    
    this.image.onerror = () => {
      console.warn(`Failed to load avatar image: ${avatarType}, using fallback`);
      this.imageError = true;
      this.imageLoaded = false;
    };
    
    this.image.src = `assets/images/avatars/${avatarType}.png`;

    // Animation properties
    this.frameX = 0;
    this.frameY = 0;
    this.animationSpeed = 10;
    this.animationCounter = 0;
  }

  draw(ctx) {
    // If we have a valid sprite sheet loaded
    if (this.imageLoaded && !this.imageError) {
      try {
        // Each avatar has 4 rows (directions) and 4 columns (animation frames)
        const frameWidth = 32;
        const frameHeight = 48;

        // Draw the correct sprite frame
        ctx.drawImage(
          this.image,
          this.frameX * frameWidth,
          this.frameY * frameHeight,
          frameWidth,
          frameHeight,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } catch (error) {
        console.error("Error drawing character image, falling back to rectangle", error);
        this.imageError = true;
        this.drawFallback(ctx);
      }
    } else {
      // Fallback to colored rectangle if image not loaded
      this.drawFallback(ctx);
    }

    // Draw name above character
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "12px Arial";
    ctx.fillText("You", this.x + this.width / 2, this.y - 5);
  }

  drawFallback(ctx) {
    const style = this.avatarStyles[this.avatarType] || this.avatarStyles.default;

    // Draw body
    ctx.fillStyle = style.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw face
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(this.x + 8, this.y + 10, 16, 8);

    // Draw hat if applicable
    if (style.hat) {
      ctx.fillStyle = "#34495e";
      ctx.fillRect(this.x + 6, this.y, 20, 5);
    }
  }

  update() {
    if (this.moving) {
      // Update animation frame
      this.animationCounter++;
      if (this.animationCounter >= this.animationSpeed) {
        this.frameX = (this.frameX + 1) % 4; // 4 frames of animation
        this.animationCounter = 0;
      }

      // Set the row of the sprite sheet based on direction
      switch (this.direction) {
        case "down":
          this.frameY = 0;
          break;
        case "left":
          this.frameY = 1;
          break;
        case "right":
          this.frameY = 2;
          break;
        case "up":
          this.frameY = 3;
          break;
      }
    } else {
      // Reset to standing frame
      this.frameX = 0;
    }
  }

  move(direction) {
    this.moving = true;
    this.direction = direction;

    const nextPosition = { x: this.x, y: this.y };

    switch (direction) {
      case "up":
        nextPosition.y -= this.speed;
        break;
      case "down":
        nextPosition.y += this.speed;
        break;
      case "left":
        nextPosition.x -= this.speed;
        break;
      case "right":
        nextPosition.x += this.speed;
        break;
    }

    // Check if the next position is valid (not colliding with obstacles)
    if (
      this.scene.isValidPosition(
        nextPosition.x,
        nextPosition.y,
        this.width,
        this.height
      )
    ) {
      this.x = nextPosition.x;
      this.y = nextPosition.y;
    }
  }

  stopMoving() {
    this.moving = false;
  }
}

// Export the Character class
window.Character = Character;
