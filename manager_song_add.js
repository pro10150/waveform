const inputTitle = document.getElementById("input-title");
const inputLyrics = document.getElementById("lyrics");
const submitButton = document.getElementById("btn-add");

submitButton.addEventListener("click",function(){onClickSubmit()});

function onClickSubmit(){
    if(inputTitle.value === '') alert("Please put a title on");
    else alert(inputTitle.value + "\n" + inputLyrics.value);
}

