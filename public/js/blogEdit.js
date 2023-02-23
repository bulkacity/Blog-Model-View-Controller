// Get a reference to the edit button and the textarea
const editBtn = document.getElementById('edit-btn');
const blogPostDesc = document.getElementById('blogPost-desc');
 if (editBtn) {
  console.log("found edit button");
 }
// Add a click event listener to the edit button
editBtn.addEventListener('click', () => {
  // Display the textarea
  console.log('Edit button clicked');
  blogPostDesc.style.display = 'block';
});

const editBtns = document.querySelectorAll('.edit-btn');
const blogPostContent = document.querySelector('.blogPost-content');

// Add a click event listener to each edit button
editBtns.forEach(editBtn => {
  editBtn.addEventListener('click', () => {
    // Create a text box and submit button
    const textBox = document.createElement('textarea');
    const submitBtn = document.createElement('button');

    // Set the attributes of the text box and submit button
    textBox.setAttribute('class', 'form-input');
    textBox.setAttribute('id', 'blogPost-desc');
    textBox.setAttribute('name', 'blogPost-desc');

    submitBtn.setAttribute('class', 'btn btn-sm btn-primary submit-btn');
    submitBtn.setAttribute('data-id', editBtn.getAttribute('data-id'));
    submitBtn.textContent = 'Submit';

    // Insert the text box and submit button into the blog post content
    blogPostContent.appendChild(textBox);
    blogPostContent.appendChild(submitBtn);

    // Remove the edit button
    editBtn.style.display = 'none';

    // Add a click event listener to the submit button
    submitBtn.addEventListener('click', () => {
      // Get the value of the text box
      const blogPostDesc = textBox.value;

      // Make a PUT request to update the blog post description
      fetch(`/blogPosts/${submitBtn.getAttribute('data-id')}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: blogPostDesc })
      })
      .then(response => response.json())
      .then(data => {
        // Update the blog post description in the UI
        const blogPostDescElem = document.querySelector(`[data-id="${data.id}"] .blogPost-desc`);
        blogPostDescElem.textContent = data.description;

        // Remove the text box and submit button
        blogPostContent.removeChild(textBox);
        blogPostContent.removeChild(submitBtn);

        // Show the edit button again
        editBtn.style.display = 'block';
      })
      .catch(error => console.error(error));
    });
  });
});

