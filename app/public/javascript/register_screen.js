const submitButton = document.getElementById("register-btn");
const search = document.getElementById("search");
const nameInput = document.getElementsByClassName("register-form");
var password = document.getElementById('input-password');
var confirmPassword = document.getElementById('input-confirm-password');

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
submitButton.onclick = validatePassword;

