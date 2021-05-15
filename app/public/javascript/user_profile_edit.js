let search = document.querySelector("#search");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const submitButton = document.getElementById("edit-btn");
const name = document.getElementById("input-name");
const lastName = document.getElementById("input-last-name");


submitButton.addEventListener("click",function(){onClickSubmit()});
img.addEventListener("change",function(event){changeImg()});
search.addEventListener("keypress",function(){searchEnter(event)});

function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
    }
}
function changeImg(){

    url.src = URL.createObjectURL(event.target.files[0]);
    url.onload = function(){
        URL.revokeObjectURL(url.src);
    }
}
function onClickSubmit(){
}