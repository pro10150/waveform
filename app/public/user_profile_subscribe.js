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

if(parseInt(y) < parseInt(year.value))
    check = true;
else{
    if(parseInt(y) === parseInt(year.value)){
        if(parseInt(m) < parseInt(month.value))
            check = true;
        else check = false;
    } 
    else check = false;
}

console.log(check);

    if(ccn.value.length === 16 && name.value !== "" && month.value !== "month" && check && year.value !== "year" && cvv.value.length === 3) {
        var check = confirm('Are you sure about that');
        if(check){
            alert(ccn.value + "\n" + name.value + "\n" + month.value + "\n" + year.value + "\n" + cvv.value);
            window.location.href = "/profile";
        }
        else alert('The fuck are you submitted for');
        
    }
    else alert("Please enter everything correctly");
}
function searchEnter(event){
    if(event.keyCode === 13){
        // window.location.href = 'search.html';
        alert(document.getElementById("search").value);
    }
}