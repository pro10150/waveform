const submitButton = document.getElementById("artistNameButton");
const artistName = document.getElementById("artistNameForm");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const backButton = document.getElementById('back');

backButton.addEventListener('click', function(){onClickBack()});
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
    // if(artistName.value !== '' && url.src !== 'http://localhost:3000/src/upload-pic.png') alert(artistName.value + "\n" + url.src);
}