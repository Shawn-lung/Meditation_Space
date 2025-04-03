document.addEventListener("DOMContentLoaded", function () {
  // Sample media data (would typically come from a server/database)
  const mediaItems = [
    {
      id: 1,
      title: "冥想呼吸 | Breathing Meditation",
      type: "audio",
      src: "assets/audio/breathing-meditation.mp3",
      duration: "10:00",
    },
    {
      id: 2,
      title: "身體掃描 | Body Scan",
      type: "audio",
      src: "assets/audio/body-scan.mp3",
      duration: "15:00",
    },
    {
      id: 3,
      title: "正念冥想 | Mindfulness",
      type: "audio",
      src: "assets/audio/mindfulness.mp3",
      duration: "20:00",
    },
    {
      id: 4,
      title: "自然冥想 | Nature Meditation",
      type: "video",
      src: "assets/video/nature-meditation.mp4",
      duration: "10:00",
    },
    {
      id: 5,
      title: "引導冥想 | Guided Meditation",
      type: "video",
      src: "assets/video/guided-meditation.mp4",
      duration: "15:00",
    },
    {
      id: 6,
      title: "初學者冥想指南 | Beginner Meditation",
      type: "youtube",
      videoId: "GszmHs8qPFE", 
      duration: "10:01"
    },
  ];

  const mediaListElement = document.querySelector(".media-list");
  const playPauseBtn = document.getElementById("play-pause");
  const volumeControl = document.getElementById("volume");

  let currentMedia = null;
  let isPlaying = false;
  let audioElement = new Audio();
  let videoElement = document.createElement("video");
  videoElement.style.display = "none";
  document.querySelector(".media-player").appendChild(videoElement);

  // Populate media list
  function renderMediaList() {
    mediaListElement.innerHTML = "";

    mediaItems.forEach((item) => {
      const mediaItemElement = document.createElement("div");
      mediaItemElement.classList.add("media-item");
      mediaItemElement.setAttribute("data-id", item.id);

      let icon;
      if (item.type === "audio") {
        icon = '<i class="fas fa-music"></i>';
      } else if (item.type === "video") {
        icon = '<i class="fas fa-video"></i>';
      } else if (item.type === "youtube") {
        icon = '<i class="fab fa-youtube"></i>';
      }

      mediaItemElement.innerHTML = `
        ${icon}
        <h3>${item.title}</h3>
        <p>${item.duration}</p>
      `;

      mediaItemElement.addEventListener("click", () => selectMedia(item));

      mediaListElement.appendChild(mediaItemElement);
    });
  }

  // Select and prepare media for playback
  function selectMedia(media) {
    currentMedia = media;

    if (isPlaying) {
      stopMedia();
    }

    if (media.type === "audio") {
      videoElement.style.display = "none";
      audioElement.src = media.src;
      audioElement.volume = volumeControl.value / 100;
    } else if (media.type === "video") {
      videoElement.style.display = "block";
      videoElement.src = media.src;
      videoElement.volume = volumeControl.value / 100;
    } else if (media.type === "youtube") {
      playYoutubeVideo(media.videoId);
      return; // Return early as YouTube handles its own playback
    }

    playMedia();
  }

  // Play the current media
  function playMedia() {
    if (!currentMedia) return;

    if (currentMedia.type === "audio") {
      audioElement.play();
    } else if (currentMedia.type === "video") {
      videoElement.play();
    }

    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  // Pause the current media
  function pauseMedia() {
    if (!currentMedia) return;

    if (currentMedia.type === "audio") {
      audioElement.pause();
    } else if (currentMedia.type === "video") {
      videoElement.pause();
    }

    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }

  // Stop the current media
  function stopMedia() {
    pauseMedia();

    if (currentMedia.type === "audio") {
      audioElement.currentTime = 0;
    } else if (currentMedia.type === "video") {
      videoElement.currentTime = 0;
    }
  }

  // Event listeners
  playPauseBtn.addEventListener("click", () => {
    if (!currentMedia) {
      // If no media is selected, choose the first one
      if (mediaItems.length > 0) {
        selectMedia(mediaItems[0]);
      }
      return;
    }

    if (isPlaying) {
      pauseMedia();
    } else {
      playMedia();
    }
  });

  volumeControl.addEventListener("input", () => {
    const volume = volumeControl.value / 100;
    audioElement.volume = volume;
    videoElement.volume = volume;
  });

  // Initialize
  renderMediaList();
  loadMediaContent();

  function loadMediaContent() {
    document.querySelectorAll("video").forEach((video) => {
      video.onerror = function () {
        console.error(`Error loading video: ${video.src}`);

        const container = video.parentElement;
        const errorMsg = document.createElement("div");
        errorMsg.className = "video-error";
        errorMsg.innerHTML = `
          <i class="fas fa-exclamation-circle"></i>
          <p>Video could not be loaded</p>
          <p class="error-details">Please check that "${video.src
            .split("/")
            .pop()}" exists</p>
        `;
        container.replaceChild(errorMsg, video);
      };
    });
  }

  function getVideoPath(filename) {
    return `assets/videos/${filename}`;
  }

  function playMeditationVideo(videoName) {
    const videoModal = document.getElementById("video-modal");
    const videoContent = document.getElementById("video-content");

    videoContent.innerHTML = "";
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;

    const source = document.createElement("source");
    source.src = getVideoPath(videoName);
    source.type = "video/mp4";

    const fallbackText = document.createElement("p");
    fallbackText.textContent = "Your browser does not support the video tag.";

    video.appendChild(source);
    video.appendChild(fallbackText);
    videoContent.appendChild(video);

    video.onerror = function () {
      videoContent.innerHTML = `
        <div class="video-error">
          <i class="fas fa-exclamation-circle"></i>
          <p>Video "${videoName}" could not be loaded</p>
          <button id="close-error-video">Close</button>
        </div>
      `;
      document
        .getElementById("close-error-video")
        .addEventListener("click", () => {
          videoModal.style.display = "none";
        });
    };

    videoModal.style.display = "flex";
  }

  // Add this function to support YouTube embeds
  function playYoutubeVideo(videoId) {
    const videoModal = document.getElementById("video-modal");
    const videoContent = document.getElementById("video-content");

    videoContent.innerHTML = `
      <div class="youtube-container">
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/${videoId}" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <button id="close-video-btn">Close</button>
    `;

    document.getElementById("close-video-btn").addEventListener("click", function() {
      videoModal.style.display = "none";
    });

    videoModal.style.display = "flex";
  }
});
