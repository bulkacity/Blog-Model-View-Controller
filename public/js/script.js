const form = document.querySelector("form");
if (form) {
  // Listen for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = form.title.value;
    const body = form.body.value;
    try {
      const response = await fetch("/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });
      if (response.ok) {
        location.href = "/";
      } else {
        throw new Error("Error creating post");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  });
}

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  // Listen for delete button click
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = button.dataset.postId;
    try {
      const response = await fetch(`/post/${postId}`, { method: "DELETE" });
      if (response.ok) {
        location.reload();
      } else {
        throw new Error("Error deleting post");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting post");
    }
  });
});
