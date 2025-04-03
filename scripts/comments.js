document.addEventListener("DOMContentLoaded", function () {
  // Sample comments (would typically come from a server/database)
  let comments = [
    {
      id: 1,
      name: "靜心者",
      text: "這個冥想空間真的很棒，幫助我放鬆心情。",
      timestamp: "2023-05-15T10:30:00",
    },
    {
      id: 2,
      name: "禪修學生",
      text: "呼吸冥想音頻很有幫助，謝謝分享！",
      timestamp: "2023-05-16T14:45:00",
    },
    {
      id: 3,
      name: "冥想愛好者",
      text: "我每天都會來這裡練習15分鐘，感覺越來越好。",
      timestamp: "2023-05-17T09:15:00",
    },
  ];

  const commentsListElement = document.querySelector(".comments-list");
  const commentForm = document.getElementById("comment-form");
  const commentText = document.getElementById("comment-text");
  const commentName = document.getElementById("comment-name");

  // Render all comments
  function renderComments() {
    commentsListElement.innerHTML = "";

    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const date = new Date(comment.timestamp);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      commentElement.innerHTML = `
                <h4>${comment.name} <span class="comment-date">${formattedDate}</span></h4>
                <p>${comment.text}</p>
            `;

      commentsListElement.appendChild(commentElement);
    });
  }

  // Add a new comment
  function addComment(name, text) {
    if (!name || !text) return;

    const newComment = {
      id: comments.length + 1,
      name: name,
      text: text,
      timestamp: new Date().toISOString(),
    };

    comments.unshift(newComment); // Add to the beginning of the array
    renderComments();
  }

  // Listen for comment form submission
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = commentName.value.trim();
    const text = commentText.value.trim();

    if (name && text) {
      addComment(name, text);
      commentName.value = "";
      commentText.value = "";
    }
  });

  // Initialize
  renderComments();
});
