let search = document.querySelector("#search");
const register = document.querySelector("#register-btn");
const reveal = document.getElementById("flexCheckDefault");
const login = document.getElementById("btn-login");
const submit = document.getElementById('btn-submit');
var password = document.getElementById('input-password');

search.addEventListener("keypress",function(){searchEnter(event)});

function onClickRegister(){
    window.location.href = '/register';
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
    }
}
function onClickReveal(){
    if(reveal.checked === true){
        password.type = 'text';
    }
    else password.type = 'password';
}