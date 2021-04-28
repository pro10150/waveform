const addArtistButton = document.getElementById("btn-add-more-artist");
const artistButton = document.getElementsByClassName("artist-btn");
const editButton = document.getElementById("btn-edit");
const backLink = document.getElementsByClassName('backLink');

addArtistButton.addEventListener("click",function(){onClickAddArtist()});
editButton.addEventListener("click",function(){onClickEdit()});
for(let i = 0;i < artistButton.length;i++){
    artistButton[i].addEventListener("click",function(){onClickArtist(i)});
}

function onClickEdit(){
    window.location.href = backLink[0].id + "/edit";
}
function onClickArtist(i){
    console.log(i);
    window.location.href = artistButton[i].id;
}
function onClickAddArtist(){
    window.location.href = backLink[0].id + "/add";
}