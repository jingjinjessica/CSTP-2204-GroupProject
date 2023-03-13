const deletePost = async (id, userType) =>{
  try {
    if (userType ==="owner"){
      const response = await fetch(`/api/v1/ownerposts/delete/${id}`, {
        method: "delete"
      });
      if (response) {
        window.location.reload();
      }
    }
    else if(userType ==="sitter"){
      const response = await fetch(`/api/v1/sitterposts/delete/${id}`, {
        method: "delete"
      });
      if (response) {
        window.location.reload();
      }
    }
  } catch (error) {
    console.log(error);
  }

}

const editPost = async (id,userType ) =>{
  if(userType === "owner"){
    window.location.href = `/post/editpost/${id}`;
  }
  else if(userType === "sitter"){
    window.location.href = `/post/editsitterpost/${id}`;
  }
  
  // window.location.href = `/post/getpost/${id}`;
}

