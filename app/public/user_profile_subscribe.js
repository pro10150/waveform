const search = document.querySelector("#search");
const proceed = document.getElementById("btn-proceed");
const ccn = document.getElementById("ccn");
const name = document.getElementById("name");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvv = document.getElementById("cvv");
let d = new Date();
let y = d.getFullYear();
let m = d.getMonth();
m++;
let check = false;
let yearInput = parseInt(year.value);
let monthInput = parseInt(month.value);

proceed.addEventListener("click",function(){onClickProceed()});
search.addEventListener("keypress",function(){searchEnter(event)});

console.log("full date: " + d.getDate());
console.log("year: " + y);
console.log("month: " + m);


function onClickProceed(){
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}