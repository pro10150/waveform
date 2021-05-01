const search = document.getElementById("search");
const albumButton = document.getElementsByClassName("artist-btn");
const back = document.getElementById('back');

search.addEventListener("keypress",function(){searchEnter(event)});
back.addEventListener('click', function(){onClickBack()});
for(let i = 0;i < albumButton.length;i++){
    albumButton[i].addEventListener("click",function(){onClickArtist(i)});
}

function onClickBack(){
    window.history.back();
}
function onClickArtist(i){
    window.location.href = albumButton[i].id;
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
    }
}