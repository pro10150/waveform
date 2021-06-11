let search = document.querySelector("#search");
const register = document.querySelector("#register-btn");
const reveal = document.getElementById("flexCheckDefault");
const reveal2 = document.getElementById("flexCheckDefault-2");
const login = document.getElementById("btn-login");
const submit = document.getElementById('btn-submit');
var password = document.getElementById('input-password');
var password2 = document.getElementById('input-password-2');
var confirmPassword = document.getElementById('confirm');

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
    if(reveal.checked === true || reveal2.checked === true){
        password.type = 'text';
        password2.type = 'text';
    }
    else {
        password.type = 'password';
        password2.type = 'password';
    }
}
function validatePassword(){
    if(password.value != confirmPassword.value){
        confirmPassword.setCustomValidity("Passwords Don't Match");
    }
    else{
        confirmPassword.setCustomValidity("");
    }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;
submit.onclick = validatePassword;