function attachMyProfile(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('petSitterProfile');
            image.src = e.target.result;
            image.className = "profileImg_edit";
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function attachPhoto1(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('photoCover1');
            image.src = e.target.result;
            image.className = "profileImg_edit";
        };

        reader.readAsDataURL(input.files[0]);
    }
}


function attachPhoto2(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('photoCover2');
            image.src = e.target.result;
            image.className = "profileImg_edit";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function attachPhoto3(input){
    if(input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var image = document.getElementById('photoCover3');
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