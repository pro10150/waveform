const search = document.getElementById("search");
const albumButton = document.getElementsByClassName("artist-btn");

search.addEventListener("keypress",function(){searchEnter(event)});
for(let i = 0;i < albumButton.length;i++){
    albumButton[i].addEventListener("click",function(){onClickArtist(i)});
}

function onClickArtist(i){
    window.location.href = "artist.html";
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}