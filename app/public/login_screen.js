let search = document.querySelector("#search");
const register = document.querySelector("#register-btn");
const reveal = document.getElementById("flexCheckDefault");
const password = document.getElementById("input-password");
const login = document.getElementById("btn-login");

reveal.addEventListener("click",function(){onClickReveal()});
search.addEventListener("keypress",function(){searchEnter(event)});
register.addEventListener("click",function(){onClickRegister()});
login.addEventListener("click",function(){submitLogin()});

function onClickRegister(){
    window.location.href = '/register';
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}
function onClickReveal(){
    if(reveal.checked === true){
        password.type = 'text';
    }
    else password.type = 'password';
}
function submitLogin(){
    alert(document.getElementById("input-email").value + "\n" + document.getElementById("input-password").value);
    window.location.href = "/";
}