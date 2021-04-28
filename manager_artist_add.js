const submitButton = document.getElementById("artistNameButton");
const artistName = document.getElementById("artistNameForm");
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
    alert(artistName.value + "\n" + img.value);
}