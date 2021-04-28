const submitButton = document.getElementById("albumNameButton");
const songTitle = document.getElementById("albumNameForm");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");

submitButton.addEventListener("click",function(){onClickSubmit()});
linkButton.addEventListener("click",function(){changeImg()});

function changeImg(){
    
    let newUrl = img.value;
    console.log(img.value);
    url.style.backgroundImage = "url('"+newUrl+"')";
    // console.log(img.value);
}
function onClickSubmit(){
    alert(songTitle.value + "\n" + img.value);
}