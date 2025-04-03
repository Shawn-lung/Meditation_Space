document.addEventListener("DOMContentLoaded", function () {
  // Initialize the meditation space components
  console.log("Meditation Space initialized");

  // Initialize the virtual environment
  const meditationEnv = new MeditationEnvironment("meditation-canvas");
  meditationEnv.initCharacter("default");
  meditationEnv.start();

  // Avatar selection
  const avatarOptions = document.querySelectorAll(".avatar-option");
  avatarOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      avatarOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Get avatar type and reinitialize character
      const avatarType = this.getAttribute("data-avatar");
      meditationEnv.initCharacter(avatarType);
    });
  });

  // Audio controls
  document.getElementById("stop-audio").addEventListener("click", function () {
    meditationEnv.stopActiveMedia();
  });

  // Modal handling for questionnaire
  const modal = document.getElementById("questionnaire-modal");
  const openModalBtn = document.getElementById("open-questionnaire");
  const closeModalBtn = document.querySelector(".close");

  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Background animation effect for the traditional meditation space
  function animateBackground() {
    const background = document.querySelector(".space-background");
    let opacity = 0.7;
    let increasing = false;

    setInterval(() => {
      if (increasing) {
        opacity += 0.005;
        if (opacity >= 0.8) increasing = false;
      } else {
        opacity -= 0.005;
        if (opacity <= 0.6) increasing = true;
      }
      background.style.opacity = opacity;
    }, 100);
  }

  animateBackground();
});
