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

document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogPost-list')
  .addEventListener('click', delButtonHandler);
