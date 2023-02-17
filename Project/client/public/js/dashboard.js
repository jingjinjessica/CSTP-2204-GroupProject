const deletePost = async (id) =>{
  try {
    const response = await fetch(`/api/v1/ownerposts/delete/${id}`, {
      method: "delete"
      // headers: {
      //   "Content-type": "application/json",
      //   Authorization: `Bearer ${
      //     document.cookie.split("=")[1]
      //   }`,
      // },
    });
    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
