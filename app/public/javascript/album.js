const meatball = document.querySelectorAll(".meatball-menu");
// const option = document.querySelectorAll(".option-bar");
const back = document.getElementById('back');
let search = document.querySelector("#search");
const body = document.querySelector("body");
const option = document.getElementsByClassName("option-bar");
const fav = document.querySelectorAll(".favorite-option");
const download = document.querySelectorAll(".download-option");
let flag = true;

back.addEventListener('click', function(){onClickBack()});
body.addEventListener("click", function(){onClickCloseOption()});
search.addEventListener("keypress",function(){searchEnter(event)});
for(let i = 0; i < meatball.length; i++){
    console.log("test");
    meatball[i].addEventListener("click",function(){onClickOption(i)});
}
for(let i = 0;i < fav.length; i++){
    fav[i].addEventListener("click",function(){onClickFavorite(i)});
}
for(let i = 0;i < download.length; i++){
    download[i].addEventListener("click",function(){onClickDownload(i)});
}

function onClickBack(){
    window.history.back();
}
function onClickDownload(i){
    flag = true;
    alert("downloaded " + i);
}
function onClickFavorite(i){
    flag = true;
    alert("add to fav " + i);
}
function onClickCloseOption(){
    console.log("test");  
    if(flag === false){
       for(let i = 0; i < option.length; i++){
            if(option[i].style.display === "block")
                option[i].style.display = "none";
        } 
    }  
    flag = false;
}
function onClickOption(i){
    console.log("Hello");
    flag = true;
    for(let j = 0;j < option.length ;j++){
        option[j].style.display = "none";
    }
    option[i].style.display = "block";
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
    }
}
