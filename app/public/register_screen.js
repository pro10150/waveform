const submitButton = document.getElementById("register-btn");
const search = document.getElementById("search");
const nameInput = document.getElementsByClassName("register-form");

search.addEventListener("keypress",function(){searchEnter(event)});
submitButton.addEventListener("click",function(){onClickSubmit()});

function onClickSubmit(){
    if(nameInput[0].value === "" || nameInput[1].value === "" || nameInput[2].value === "" || nameInput[3].value === "" || nameInput[4].value === "") alert("Please put an entire required input");
    else if (nameInput[3].value !== nameInput[4].value) alert("Password is not the same");
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}