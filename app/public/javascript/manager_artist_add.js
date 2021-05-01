const submitButton = document.getElementById("artistNameButton");
const artistName = document.getElementById("artistNameForm");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const backButton = document.getElementById('back');

backButton.addEventListener('click', function(){onClickBack()});
submitButton.addEventListener("click",function(){onClickSubmit()});
linkButton.addEventListener("click",function(){changeImg()});

function onClickBack(){
    window.history.back();
}
function changeImg(){
    
    let newUrl = img.value;
    console.log(img.value);
    if(newUrl !== '') url.src = newUrl;
    // console.log(img.value);
}
function onClickSubmit(){
    // if(artistName.value !== '' && url.src !== 'http://localhost:3000/src/upload-pic.png') alert(artistName.value + "\n" + url.src);
}