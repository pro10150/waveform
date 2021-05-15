const submitButton = document.getElementById("albumNameButton");
const songTitle = document.getElementById("albumNameForm");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const back = document.getElementById('back');

back.addEventListener('click', function(){onClickBack()});
submitButton.addEventListener("click",function(){onClickSubmit()});
img.addEventListener("change",function(event){changeImg()});

function onClickBack(){
    window.history.back();
}
function changeImg(){

    url.src = URL.createObjectURL(event.target.files[0]);
    url.onload = function(){
        URL.revokeObjectURL(url.src);
    }
}
function onClickSubmit(){
    // alert(songTitle.value + "\n" + url.src);
}