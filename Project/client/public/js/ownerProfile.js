function attachMyProfile(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('petOwnerProfile');
            image.src = e.target.result;
            image.className = "profileImg_edit";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function attachMyPetPic(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('petProfile');
            image.src = e.target.result;
            image.className = "profileImg_edit";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function validateForm()
{
    return true;
}

