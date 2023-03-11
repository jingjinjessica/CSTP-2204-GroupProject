const deletePost = async (id) =>{
  try {
    const response = await fetch(`/api/v1/ownerposts/delete/${id}`, {
      method: "delete"
    });
    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

const editPost = async (id) =>{
  try {
    const response = await fetch(`/api/v1/ownerposts/${id}`, {
      method: "put"
    });
    if (response) {
      window.location.href = `/ownerlist/${id}`;
    }
  } catch (error) {
    console.log(error);
  }
}
