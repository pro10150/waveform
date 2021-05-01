const submitButton = document.getElementById("albumNameButton");
const songTitle = document.getElementById("albumNameForm");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const back = document.getElementById('back');

back.addEventListener('click', function(){onClickBack()});
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
    // alert(songTitle.value + "\n" + url.src);
}