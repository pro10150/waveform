const search = document.getElementById("search");
const albumButton = document.getElementsByClassName("artist-btn");
const back = document.getElementById('back');

back.addEventListener('click', function(){onClickBack()});
search.addEventListener("keypress",function(){searchEnter(event)});
for(let i = 0;i < albumButton.length;i++){
    albumButton[i].addEventListener("click",function(){onClickAlbum(i)});
}

function onClickBack(){
    window.history.back();
}
function onClickAlbum(i){
    window.location.href = albumButton[i].id;
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}