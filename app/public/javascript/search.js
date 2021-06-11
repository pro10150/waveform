const meatball = document.querySelectorAll(".meatball-menu");
const search = document.querySelector("#search");
const body = document.querySelector("body");
const option = document.getElementsByClassName("option-bar");
const fav = document.querySelectorAll(".favorite-option");
const download = document.querySelectorAll(".download-option");
const artist = document.getElementsByClassName("btn-artist");
const album = document.getElementsByClassName("btn-album");
const topResult = document.getElementById("top-result");
const topResult2 = document.getElementById("top-result-2");
const topType = document.getElementById("type-top-result");
const topType2 = document.getElementById("type-top-result-2");
const topResultId = document.getElementsByClassName('id-top-result');
const topResultId2 = document.getElementsByClassName('id-top-result-2');
const keyword = document.getElementsByClassName('hidden'); 
let flag = true;

topResult.addEventListener("click",function(){onClickTopResult()});
topResult2.addEventListener("click",function(){onClickTopResult()});
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
for(let i = 0;i < artist.length;i++){
    artist[i].addEventListener("click",function(){onClickArtist(i)});
}
for(let i = 0;i < album.length;i++){
    album[i].addEventListener("click",function(){onClickAlbum(i)});
}

function onClickTopResult(){
    if(topType.innerText === "SONG") window.location.href = "/album/" + topResultId[0].id;
    else if(topType.innerText === "ALBUM") window.location.href = "/album/" + topResultId[1].id;
    else window.location.href = "/artist/" + topResultId[1].id;
    if(topType2.innerText === "SONG") window.location.href = "/album/" + topResultId2[0].id;
    else if(topType2.innerText === "ALBUM") window.location.href = "/album/" + topResultId2[1].id;
    else window.location.href = "/artist/" + topResultId2[1].id;
}
function onClickArtist(i){
    window.location.href = artist[i].id;
}
function onClickAlbum(i){
    window.location.href = album[i].id;
}
function onClickDownload(i){
    flag = true;
}
function onClickFavorite(i){
    flag = true;
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