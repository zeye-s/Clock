const setTime = document.getElementById("setTime");
const editTime = document.getElementById("editTime");
const submit = document.getElementById("submit");
const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");
const selectTime = document.getElementById("selectTime")

let time;
let clock = document.getElementById("clock")
let hour;
let military;
let minute;
let second;
let inputted = false;

setTime.addEventListener("click", ()=>{
    editTime.classList.add("open");
})

submit.addEventListener("click", ()=>{
    editTime.classList.remove("open");
    hour = inputHours.value;
    minute = inputMinutes.value;
    second = inputSeconds.value;
    military = selectTime.value;
    inputted = true;
})


function updateClock(){
    let now = new Date();
    hour = now.getHours();
    military = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    hour = hour.toString().padStart(2);

    minute = now.getMinutes();
    if(minute < 10){
        minute = '0' + minute.toString();
    }
    else{
        minute.toString().padStart(2);
    }

    second = now.getSeconds();
    if(second < 10){
        second = '0' + second.toString();
    }
    else{
        second.toString().padStart(2);
    }

    time = `${hour}:${minute}:${second} ${military}`;
    document.getElementById("clock").textContent = time;
}

function increClock(){

}


if(!inputted){
    setInterval(updateClock, 1000);
}


const canvas = document.getElementById("drawBoard");
const ctx = canvas.getContext('2d');
const binary = '01';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = binary + alphabet;
const fontSize = 20;
const RETRO = "RETRO";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const columns = canvas.width/(fontSize + 2);


const rainDrop = [];
for(let i = 0; i < columns; i++){
    rainDrop[i] = 1;
}

function draw (){
    ctx.fillStyle = 'rgba(0,0,0, 0.2)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(1, 255, 1)';
    ctx.font = fontSize + RETRO;

    for(let j = 0; j < rainDrop.length; j++){
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, j * fontSize, rainDrop[j] * fontSize);
        if(rainDrop[j] * fontSize > canvas.height && Math.random() > 0.975){
            rainDrop[j] = 0;
        }
        rainDrop[j]++;
    }
}

setInterval(draw, 120);

