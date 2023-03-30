// user avatar image upload
function attachMyProfile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("avatar-preview").setAttribute("src", e.target.result);
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
            document.getElementById("petProfile").setAttribute("src", pet.target.result);
            document.getElementById("petProfile").style.display = "block";
        };

        reader.readAsDataURL(petInput.files[0]);
    }
}

// pet sitter experience image upload
function attachPhoto1(photoInput1) {
    if (photoInput1.files && photoInput1.files[0]) {
        var reader = new FileReader();
        reader.onload = function (photo1) {
            document.getElementById("photo1preview").setAttribute("src", photo1.target.result);
            document.getElementById("photo1preview").style.display = "block";
        };

        reader.readAsDataURL(photoInput1.files[0]);
    }
}


function attachPhoto2(photoInput2) {
    if (photoInput2.files && photoInput2.files[0]) {
        var reader = new FileReader();
        reader.onload = function (photo2) {
            document.getElementById("photo2preview").setAttribute("src", photo2.target.result);
            document.getElementById("photo2preview").style.display = "block";
        };

        reader.readAsDataURL(photoInput2.files[0]);
    }
}

function attachPhoto3(photoInput3) {
    if (photoInput3.files && photoInput3.files[0]) {
        var reader = new FileReader();
        reader.onload = function (photo3) {
            document.getElementById("photoCover3").setAttribute("src", photo3.target.result);
            document.getElementById("photoCover3").style.display = "block";
        };

        reader.readAsDataURL(photoInput3.files[0]);
    }
}



async function validateForm(form) {

    const userName = document.getElementById("name").value;
    const res = await fetch(`/api/v1/users/checkusername?name=${userName}`,{
        method: "get",
        headers: {
            "Content-type": "application/json",
      },
    });

    const message = await res.json();
    if (message.userExist){
        alert("The username is existed, please use another one.");
    }
    else{
        form.submit();
    }
}

