const search = document.querySelector("#search");
const proceed = document.getElementById("btn-proceed");
var password = document.getElementById('newPassword');
var confirmPassword = document.getElementById('confirm');

proceed.addEventListener("click",function(){onClickProceed()});
search.addEventListener("keypress",function(){searchEnter(event)});



function onClickProceed(){
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
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
proceed.onclick = validatePassword;