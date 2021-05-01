let search = document.querySelector("#search");
const album = document.querySelectorAll(".artist-btn");
const artistName = document.getElementsByClassName('artist-name');
const back = document.getElementById('back');

back.addEventListener('click', function(){onClickBack()});
search.addEventListener("keypress",function(){searchEnter(event)});
for(let i = 0;i < album.length;i++){
    album[i].addEventListener("click",function(){onClickAlbum(i)});
}

function onClickBack(){
    window.history.back();
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
    }
}
function onClickAlbum(i){
    window.location.href = '/album/' + album[i].id;
}
