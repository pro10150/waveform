const artistButton = document.querySelectorAll(".btn-artist");
const artistId = document.querySelectorAll('.id-artist');
const albumButton = document.querySelectorAll(".btn-album");
const albumId = document.querySelectorAll('.id-album');
const search = document.getElementById("search");
let flag = true;
const meatball = document.querySelectorAll(".meatball-menu");
const option = document.getElementsByClassName("option-bar");
const body = document.querySelector("body");
const album = document.querySelectorAll(".album-top-song");
const artist = document.querySelectorAll(".artist-song");
const fav = document.querySelectorAll(".favorite-option");
const download = document.querySelectorAll(".download-option");
const albumArtistId = document.getElementsByClassName('id-artist-album');


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
// for(let i = 0;i < album.length;i++){
//     album[i].addEventListener("click", function(){onClickAlbumTopSong(i)});
// }
// for(let i = 0;i < artist.length;i++){
//     artist[i].addEventListener("click",function(){onClickArtistTopSong(i)});
// }
for(let i = 0;i < fav.length; i++){
    fav[i].addEventListener("click",function(){onClickFavorite(i)});
}
for(let i = 0;i < download.length; i++){
    download[i].addEventListener("click",function(){onClickDownload(i)});
}

// function onClickArtistTopSong(i){
//     window.location.href = '/artist/' + artistId[i].id;
// }
// function onClickAlbumTopSong(i){
//     window.location.href = 'album.html';
// }
function onClickArtist(i){
    window.location.href = '/artist/' + artistId[i].id;
}
function onClickAlbum(i){
    window.location.href = '/album/' + albumId[i].id;
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = '/search/' + search.value;
        // console.log('/search/' + search.value);
        // alert(window.location.href);
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
}
function onClickFavorite(i){
    flag = true;
}