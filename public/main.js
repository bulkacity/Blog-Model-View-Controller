const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = event.target.dataset.postId;
    const response = await fetch(`/post/${postId}/delete`, { method: "POST" });
    if (response.ok) {
      window.location.reload();
    } else {
      alert("Error deleting post");
    }
  });
});
