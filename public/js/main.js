// Listen for form submission
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = form.title.value;
    const body = form.body.value;
    fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
      .then((response) => {
        if (response.ok) {
          location.href = "/";
        } else {
          alert("Error creating post");
        }
      })
      .catch((error) => console.log(error));
  });
}

// Listen for delete button click
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = button.dataset.postId;
    fetch(`/post/${postId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          alert("Error deleting post");
        }
      })
      .catch((error) => console.log(error));
  });
});
