const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blogPost-name').value.trim();
  const description = document.querySelector('#blogPost-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blogPost');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blogPost');
    }
  }
};

const editBtns = document.querySelectorAll('.edit-btn');

editBtns.forEach(editBtn => {
  editBtn.addEventListener('click', () => {
    const blogPostContent = editBtn.parentNode.parentNode; // get the blog post content container
    const blogPostDesc = blogPostContent.querySelector('.blogPost-desc'); // get the blog post description
    const blogPostDescText = blogPostDesc.textContent; // get the text content of the description

    // create the input text box and set its value to the current description
    const textBox = document.createElement('input');
    textBox.setAttribute('type', 'text');
    textBox.setAttribute('class', 'form-input');
    textBox.setAttribute('id', 'blogPost-desc');
    textBox.setAttribute('name', 'blogPost-desc');
    textBox.setAttribute('value', blogPostDescText);

    // replace the description paragraph with the input text box
    blogPostContent.replaceChild(textBox, blogPostDesc);

    // change the edit button to a save button
    editBtn.textContent = 'SAVE';
    editBtn.classList.remove('btn-primary');
    editBtn.classList.add('btn-success');

    // add a click event listener to the save button to update the blog post description
    editBtn.addEventListener('click', () => {
      const newDescText = textBox.value; // get the new description text
      const blogPostId = blogPostContent.getAttribute('data-id'); // get the blog post ID

      // make a PUT request to update the blog post description
      fetch(`/api/blogPosts/${blogPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescText })
      })
      .then(response => response.json())
      .then(data => {
        // replace the input text box with a new description paragraph
        const newDesc = document.createElement('p');
        newDesc.setAttribute('class', 'blogPost-desc');
        newDesc.textContent = data.description;
        blogPostContent.replaceChild(newDesc, textBox);

        // change the save button back to an edit button
        editBtn.textContent = 'EDIT';
        editBtn.classList.remove('btn-success');
        editBtn.classList.add('btn-primary');
      })
      .catch(error => console.error(error));
    });
  });
});

const editFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blogPost-name').value.trim();
  const description = document.querySelector('#blogPost-desc').value.trim();
  const id = window.location.toString().split('/').slice(-1)[0];

  if (name && description) {
    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update blogPost');
    }
  }
};


document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.blogPost-list')
//   .addEventListener('click', delButtonHandler);
document.querySelector('.blogPost-list')
  .addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      await delButtonHandler(event);
    } else if (event.target.classList.contains('edit-btn')) {
      await editFormHandler(event);
    }
  });