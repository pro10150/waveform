const search = document.getElementById("search");
const subscribeButton = document.getElementById("subscribe-btn");
const editButton = document.getElementById("edit-btn");

editButton.addEventListener("click",function(){onClickEdit()});
search.addEventListener("keypress",function(){searchEnter(event)});
subscribeButton.addEventListener("click",function(){onClickSubscribe()});

function onClickEdit(){
    window.location.href = "user_profile_edit.html";
}
function onClickSubscribe(){
    window.location.href = "user_profile_subscribe.html";
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}