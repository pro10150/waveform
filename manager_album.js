let flag = true;
const addAlbumButton = document.querySelector("#btn-add-more-album");
const editButton = document.querySelector("#btn-edit");
const meatball = document.querySelectorAll(".meatball-menu");
const option = document.getElementsByClassName("option-bar");
const body = document.querySelector("body");
const songList = document.getElementsByClassName("song-list");
const deleteButton = document.getElementsByClassName("delete-option");

addAlbumButton.addEventListener("click",function(){onClickAddAlbum()});
editButton.addEventListener("click",function(){onClickEdit()});
body.addEventListener("click", function(){onClickCloseOption()});
for(let i = 0;i < meatball.length;i++){
    meatball[i].addEventListener("click",function(){onClickOption(i)});
}
for(let i = 0;i < deleteButton.length;i++){
    deleteButton[i].addEventListener("click",function(){onClickDelete(i)});
}

function onClickDelete(i){
    console.log(i);
    songList[i].style.display = "none";
}
function onClickAddAlbum(){
    window.location.href = "manager_album_add.html";
}
function onClickEdit(){
    window.location.href = "manager_album_add.html";
}
function onClickCloseOption(){
    // console.log("test");  
    if(flag === false){
       for(let i = 0; i < option.length; i++){
            if(option[i].style.display === "block")
                option[i].style.display = "none";
        } 
    }  
    flag = false;
}
function onClickOption(i){
    // console.log("Hello");
    flag = true;
    for(let j = 0;j < option.length ;j++){
        option[j].style.display = "none";
    }
    option[i].style.display = "block";
}