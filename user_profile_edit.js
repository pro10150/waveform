let search = document.querySelector("#search");
const img = document.getElementById("fileToUpload");
const url = document.getElementById("profile-img");
const linkButton = document.getElementById("btn-add");
const submitButton = document.getElementById("edit-btn");
const name = document.getElementById("input-name");
const lastName = document.getElementById("input-last-name");


submitButton.addEventListener("click",function(){onClickSubmit()});
linkButton.addEventListener("click",function(){changeImg()});
search.addEventListener("keypress",function(){searchEnter(event)});

function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}
function changeImg(){
    
    let newUrl = img.value;
    console.log(img.value);
    url.style.backgroundImage = "url('"+newUrl+"')";
    // console.log(img.value);
}
function onClickSubmit(){
    if(name.value !== "" && lastName.value !== "") alert(name.value + "\n" + lastName.value + "\n" + img.value);
    else alert("Please enter name and lastname");
}