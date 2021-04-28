let artistButton = document.querySelectorAll(".btn-artist");
let albumButton = document.querySelectorAll(".btn-album");
let search = document.querySelector("#search");
let flag = true;
const meatball = document.querySelectorAll(".meatball-menu");
const option = document.getElementsByClassName("option-bar");
const body = document.querySelector("body");
const album = document.querySelectorAll(".album-top-song");
const artist = document.querySelectorAll(".artist-song");
const fav = document.querySelectorAll(".favorite-option");
const download = document.querySelectorAll(".download-option");


search.addEventListener("keypress",function(){searchEnter(event)});
body.addEventListener("click", function(){onClickCloseOption()});

for(let i = 0;i < artistButton.length;i++){
    artistButton[i].addEventListener("click",function(){onClickArtist(i)});
}
for(let i = 0;i < albumButton.length;i++){
    albumButton[i].addEventListener("click",function(){onClickAlbum(i)});
}
for(let i = 0;i < meatball.length;i++){
    console.log("test");
    meatball[i].addEventListener("click",function(){onClickOption(i)});
}
for(let i = 0;i < album.length;i++){
    album[i].addEventListener("click", function(){onClickAlbumTopSong(i)});
}
for(let i = 0;i < artist.length;i++){
    artist[i].addEventListener("click",function(){onClickArtistTopSong(i)});
}
for(let i = 0;i < fav.length; i++){
    fav[i].addEventListener("click",function(){onClickFavorite(i)});
}
for(let i = 0;i < download.length; i++){
    download[i].addEventListener("click",function(){onClickDownload(i)});
}

function onClickArtistTopSong(i){
    window.location.href = 'artist.html';
}
function onClickAlbumTopSong(i){
    window.location.href = 'album.html';
}
function onClickArtist(i){
    window.location.href = 'artist.html';
}
function onClickAlbum(i){
    window.location.href = 'album.html';
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
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
function onClickDownload(i){
    flag = true;
    alert("downloaded " + i);
}
function onClickFavorite(i){
    flag = true;
    alert("add to fav " + i);
}