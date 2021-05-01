const addMoreArtistButton = document.getElementById("btn-add-more-artist");
const artistButton = document.getElementsByClassName("artist-btn");

addMoreArtistButton.addEventListener("click",function(){onClickAddArtist()});
for(let i = 0;i < artistButton.length;i++){
    artistButton[i].addEventListener("click",function(){onClickArtist(i)});
}

function onClickAddArtist(){
    window.location.href = "/manager/artist/add";
}
function onClickArtist(i){
    window.location.href = artistButton[i].id;
}