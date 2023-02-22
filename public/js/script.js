// Add event listener to new post form
const newPostForm = document.querySelector("#new-post-form");
if (newPostForm) {
  newPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    try {
      const response = await fetch("/post", {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log(response);
        alert("Error creating post");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  });
}

// Add event listener to delete buttons
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const postId = event.target.getAttribute("data-post-id");
    try {
      const response = await fetch(`/post/${postId}`, { method: "DELETE" });
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log(response);
        alert("Error deleting post");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting post");
    }
  });
});
