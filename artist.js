let search = document.querySelector("#search");
const album = document.querySelectorAll(".artist-btn");

search.addEventListener("keypress",function(){searchEnter(event)});
for(let i = 0;i < album.length;i++){
    album[i].addEventListener("click",function(){onClickAlbum(i)});
}

function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}
function onClickAlbum(i){
    window.location.href = "album.html";
}
