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


$(document).ready(function () {
  var numCols = $('.row').find('.col-lg-4').length;
  if (numCols === 6) {
    $('.carousel-inner').append('<a class="carousel-control-prev" href="#inam" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#inam" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
  }
});