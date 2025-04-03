document.addEventListener("DOMContentLoaded", function () {
  const questionnaireForm = document.getElementById("questionnaire-form");

  // Sample questionnaire questions
  const questions = [
    {
      id: "q1",
      type: "radio",
      question: "您多久練習一次冥想？ | How often do you meditate?",
      options: [
        "每天 | Daily",
        "每週幾次 | Several times a week",
        "每週一次 | Once a week",
        "每月幾次 | Several times a month",
        "很少 | Rarely",
        "從來沒有 | Never",
      ],
    },
    {
      id: "q2",
      type: "checkbox",
      question:
        "您通常進行哪種類型的冥想？（可多選） | What types of meditation do you usually practice? (Select all that apply)",
      options: [
        "專注呼吸 | Breathing focus",
        "身體掃描 | Body scan",
        "引導式冥想 | Guided meditation",
        "正念冥想 | Mindfulness",
        "慈悲冥想 | Loving-kindness",
        "其他 | Other",
      ],
    },
    {
      id: "q3",
      type: "radio",
      question:
        "您認為這個冥想空間對您有幫助嗎？ | Do you find this meditation space helpful?",
      options: [
        "非常有幫助 | Very helpful",
        "有些幫助 | Somewhat helpful",
        "一般 | Neutral",
        "不太有幫助 | Not very helpful",
        "完全沒幫助 | Not helpful at all",
      ],
    },
    {
      id: "q4",
      type: "textarea",
      question:
        "您對這個冥想空間有什麼建議？ | Do you have any suggestions for this meditation space?",
    },
  ];

  // Render questionnaire
  function renderQuestionnaire() {
    const form = document.getElementById("questionnaire-form");

    // Clear previous content but keep the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    form.innerHTML = "";

    questions.forEach((q) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const questionLabel = document.createElement("p");
      questionLabel.textContent = q.question;
      questionDiv.appendChild(questionLabel);

      if (q.type === "radio" || q.type === "checkbox") {
        q.options.forEach((option, index) => {
          const optionDiv = document.createElement("div");
          optionDiv.classList.add("option");

          const input = document.createElement("input");
          input.type = q.type;
          input.name = q.id;
          input.id = `${q.id}_${index}`;
          input.value = option;

          const label = document.createElement("label");
          label.htmlFor = `${q.id}_${index}`;
          label.textContent = option;

          optionDiv.appendChild(input);
          optionDiv.appendChild(label);
          questionDiv.appendChild(optionDiv);
        });
      } else if (q.type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.name = q.id;
        textarea.rows = 4;
        questionDiv.appendChild(textarea);
      }

      form.appendChild(questionDiv);
    });

    form.appendChild(submitButton);
  }

  // Handle form submission
  questionnaireForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(questionnaireForm);
    const responses = {};

    for (const [key, value] of formData.entries()) {
      if (responses[key]) {
        if (Array.isArray(responses[key])) {
          responses[key].push(value);
        } else {
          responses[key] = [responses[key], value];
        }
      } else {
        responses[key] = value;
      }
    }

    console.log("Questionnaire responses:", responses);

    // Here you would typically send the data to a server
    // For now, just show a thank you message
    questionnaireForm.innerHTML =
      "<p>感謝您完成問卷調查！ | Thank you for completing the survey!</p>";

    // Close the modal after 2 seconds
    setTimeout(() => {
      document.getElementById("questionnaire-modal").style.display = "none";
      // Restore the form for future use
      renderQuestionnaire();
    }, 2000);
  });

  // Initialize
  renderQuestionnaire();
});
