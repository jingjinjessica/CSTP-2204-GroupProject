// user avatar image upload
function attachMyProfile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // var image = document.getElementById('profile');
            // image.src = e.target.result;
            // image.className = "profileImg_edit";
            document.getElementById("avatar-preview").setAttribute("src", e.target.result);
            document.getElementById("avatar-icon").style.display = "none";
            document.getElementById("avatar-preview").style.display = "block";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// pet avatar image upload
function attachMyPetPic(petInput) {
    if (petInput.files && petInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (pet) {
            // var image = document.getElementById('petProfile');
            // image.src = e.target.result;
            // image.className = "profileImg_edit";
            document.getElementById("pet-preview").setAttribute("src", pet.target.result);
            document.getElementById("pet-icon").style.display = "none";
            document.getElementById("pet-preview").style.display = "block";
        };

        reader.readAsDataURL(petInput.files[0]);
    }
}

// pet sitter experience image upload
function attachPhoto1(photoInput1) {
    if (photoInput1.files && photoInput1.files[0]) {
        var reader = new FileReader();

        reader.onload = function (photo1) {
            // var image = document.getElementById('photoCover1');
            // image.src = e.target.result;
            // image.className = "profileImg_edit";
            document.getElementById("photo1preview").setAttribute("src", photo1.target.result);
            document.getElementById("icon").style.display = "none";
            document.getElementById("photo1preview").style.display = "block";
        };

        reader.readAsDataURL(photoInput1.files[0]);
    }
}


function attachPhoto2(photoInput2) {
    if (photoInput2.files && photoInput2.files[0]) {
        var reader = new FileReader();

        reader.onload = function (photo2) {
            // var image = document.getElementById('photoCover2');
            // image.src = e.target.result;
            // image.className = "profileImg_edit";
            document.getElementById("photo2preview").setAttribute("src", photo2.target.result);
            document.getElementById("photo-icon-2").style.display = "none";
            document.getElementById("photo2preview").style.display = "block";
        };

        reader.readAsDataURL(photoInput2.files[0]);
    }
}

function attachPhoto3(photoInput3) {
    if (photoInput3.files && photoInput3.files[0]) {
        var reader = new FileReader();

        reader.onload = function (photo3) {
            // var image = document.getElementById('photoCover3');
            // image.src = e.target.result;
            // image.className = "profileImg_edit";
            document.getElementById("photoCover3").setAttribute("src", photo3.target.result);
            document.getElementById("photo-icon-3").style.display = "none";
            document.getElementById("photoCover3").style.display = "block";
        };

        reader.readAsDataURL(photoInput3.files[0]);
    }
}

function validateForm() {

    return true;
}