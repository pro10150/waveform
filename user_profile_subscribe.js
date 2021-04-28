const search = document.querySelector("#search");
const proceed = document.getElementById("btn-proceed");
const ccn = document.getElementById("ccn");
const name = document.getElementById("name");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvv = document.getElementById("cvv");

proceed.addEventListener("click",function(){onClickProceed()});
search.addEventListener("keypress",function(){searchEnter(event)});

function onClickProceed(){
    if(ccn.value.length !== 16 && name.value !== "" && month.value !== "month" && year.value !== "year" && cvv.value.length !== 3) 
        alert(ccn.value + "\n" + name.value + "\n" + month.value + "\n" + year.value + "\n" + cvv.value);
    else alert("Please enter everything correctly");
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}