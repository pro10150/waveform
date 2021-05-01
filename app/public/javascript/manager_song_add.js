const inputTitle = document.getElementById("input-title");
const inputLyrics = document.getElementById("lyrics");
const submitButton = document.getElementById("btn-add");
const back = document.getElementById('back');

back.addEventListener('click',function(){onClickBack()});
submitButton.addEventListener("click",function(){onClickSubmit()});

function onClickBack(){
    window.history.back();
}
function onClickSubmit(){
    // if(inputTitle.value === '') alert("Please put a title on");
}

