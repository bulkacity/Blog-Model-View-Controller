const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      try {
        const response = await fetch(`/api/blogPosts/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete blogPost');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete blogPost');
      }
    }
  };
  
  const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      document.location.replace(`/edit/${id}`);
    }
  };
  
  document.querySelector('.blogPost-list')
    .addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-btn')) {
        await delButtonHandler(event);
      } else if (event.target.classList.contains('edit-btn')) {
        await editButtonHandler(event);
      }
    });
  