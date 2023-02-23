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