const search = document.getElementById("search");
const subscribeButton = document.getElementById("subscribe-btn");
const editButton = document.getElementById("edit-btn");
const status = document.getElementsByClassName('status');

editButton.addEventListener("click",function(){onClickEdit()});
search.addEventListener("keypress",function(){searchEnter(event)});
subscribeButton.addEventListener("click",function(){onClickSubscribe()});

if(status[0].id === 'manager') window.location.href = "/manager";
function onClickEdit(){
    window.location.href = "/profile/edit";
}
function onClickSubscribe(){
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}