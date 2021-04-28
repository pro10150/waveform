const addArtistButton = document.getElementById("btn-add-more-artist");
const artistButton = document.getElementsByClassName("artist-btn");
const editButton = document.getElementById("btn-edit");

addArtistButton.addEventListener("click",function(){onClickAddArtist()});
editButton.addEventListener("click",function(){onClickEdit()});
for(let i = 0;i < artistButton.length;i++){
    artistButton[i].addEventListener("click",function(){onClickArtist(i)});
}

function onClickEdit(){
    window.location.href = "manager_artist_add.html";
}
function onClickArtist(i){
    console.log(i);
    window.location.href = "manager_album.html";
}
function onClickAddArtist(){
    window.location.href = "manager_artist_add.html";
}