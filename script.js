const setTime = document.getElementById("setTime");
const reset = document.getElementById("reset");
const editTime = document.getElementById("editTime");
const submit = document.getElementById("submit");
const close = document.getElementById("close");
const inputHours = document.getElementById("inputHours");
const inputMinutes = document.getElementById("inputMinutes");
const inputSeconds = document.getElementById("inputSeconds");
const selectTime = document.getElementById("selectTime");
const speedValue = document.getElementById("speedValue");
const speedSubmit = document.getElementById("speedSubmit");

let time;
let clock = document.getElementById("clock");
let hour;
let military;
let minute;
let second;
let inputted = false;
let intervalID;
let speed = 1000;
let US = setInterval(updateSanity, speed);
let CA = setInterval(checkAttack, speed);
let CS = setInterval(corruptSystem, speed);
let DE = setInterval(drawEffects, speed);

setTime.addEventListener("click", ()=>{
    editTime.classList.add("open");
})

reset.addEventListener("click", ()=>{
    clearInterval(intervalID);
    inputted = false;
    intervalID = setInterval(updateClock, speed);
})

submit.addEventListener("click", ()=>{
    editTime.classList.remove("open");
    hour = parseInt(inputHours.value) || 12;
    minute = parseInt(inputMinutes.value) || 0;
    second = parseInt(inputSeconds.value) || 0;
    military = selectTime.value;
    inputted = true;

    clearInterval(intervalID);
    intervalID = setInterval(increClock, speed);
})

speedSubmit.addEventListener("click", ()=>{
    let inputValue = parseInt(speedValue.value);
    if (!Number.isFinite(inputValue) || inputValue <= 0) {
        speed = 1000;
    } 
    else {
        speed = Math.max(1, 1000 / inputValue);
        if (!inputted) {
            const now = new Date();
            hour = now.getHours() % 12 || 12;
            minute = now.getMinutes();
            second = now.getSeconds();
            military = now.getHours() >= 12 ? "PM" : "AM";
            inputted = true;
        }
    }

    clearInterval(intervalID);
    intervalID = setInterval(inputted ? increClock : updateClock, speed);

    clearInterval(US);
    clearInterval(CA);
    clearInterval(CS);
    clearInterval(DE);
     US = setInterval(updateSanity, speed);
     CA = setInterval(checkAttack, speed);
     CS = setInterval(corruptSystem, speed);
     DE = setInterval(drawEffects, speed);
});

close.addEventListener("click", ()=>{
    editTime.classList.remove("open");
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
    document.getElementById("clock").textContent = corruptLines(time);
}

function increClock(){
    second++;

    if(second >= 60){
        second = 0;
        minute++;
    }

    if(minute >= 60){
        minute = 0;
        hour++;
        if(hour === 12){
            military = military === "AM" ? "PM" : "AM";
        } else if(hour > 12){
            hour = 1;
        }
    }

    if(minute < 10 && second < 10){
        time = `${hour}:0${minute}:0${second} ${military}`;
    }
    else if (minute < 10){
        time = `${hour}:0${minute}:${second} ${military}`;
    }
    else if (second < 10){
        time = `${hour}:${minute}:0${second} ${military}`;
    }
    else{
        time = `${hour}:${minute}:${second} ${military}`;
    }
    
    document.getElementById("clock").textContent = corruptLines(time);
}

if(!inputted){
    intervalID = setInterval(updateClock, speed);
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

let backgroundFill = 'rgba(0,0,0, 0.2)';
let charFill = 'rgb(1, 255, 1)';

const rainDrop = [];
for(let i = 0; i < columns; i++){
    rainDrop[i] = 1;
}

function draw (){
    ctx.fillStyle = backgroundFill;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = charFill;
    ctx.font = fontSize + 'px RETRO';

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

const body = document.getElementById("body");


function changeTheme(){
    if(hour == 12 && military == "AM" || hour == 4){
        charFill = 'rgba(247, 250, 255, 0.5)';
        backgroundFill= 'rgba(84, 86, 90, 0.5)';
        body.style.setProperty('--backgroundColor','rgb(84, 86, 90)');
        body.style.setProperty('color','rgb(231, 236, 245)');
        body.style.setProperty('--borderColor','rgb(158, 161, 168)');
        body.style.setProperty('--progressColor','rgb(199, 218, 230)');
        body.style.setProperty('--placeholderColor','rgb(231, 236, 245)');
    }
    else if (hour == 6){
        charFill = 'rgb(256, 6, 6)';
        backgroundFill = 'rgba(66, 6, 6, 0.6)';
        body.style.setProperty('--backgroundColor','rgb(66, 0, 0)');
        body.style.setProperty('color','rgb(256, 6, 6)');
        body.style.setProperty('--borderColor','rgb(156, 16, 16)');
        body.style.setProperty('--progressColor','rgb(236, 206, 196)');
        body.style.setProperty("--placeholderColor", 'rgb(256, 6, 6)');
    }
    else{
        backgroundFill = 'rgba(0,0,0, 0.2)';
        charFill = 'rgb(1, 255, 1)';
        body.style.setProperty('--backgroundColor','rgb(0,0,0)');
        body.style.setProperty('color','rgb(1, 255, 1)');
        body.style.setProperty('--borderColor','rgb(186, 243, 186)');
        body.style.setProperty('--progressColor','rgb(199, 230, 199)');
        body.style.setProperty("--placeholderColor", "rgb(1, 255, 1)");
    }
}

setInterval(changeTheme, 1000);










const control = document.getElementById("control");
const controlMenu = document.getElementById("controlMenu");
const X = document.getElementById("X");

control.addEventListener("click", ()=>{
    controlMenu.classList.add("open");
})

X.addEventListener("click", ()=>{
    controlMenu.classList.remove("open");
})

const sanity = document.getElementById("sanity");
const sanityBar = document.getElementById("sanityBar");
const sanityProgress = document.getElementById("sanityProgress");
const systemInfo = document.getElementById("systemInfo");
const weirdChars = "ⱠICⱧØS§₮ME👁☠☤☥☒⚠✝☨☩";
const Status = document.getElementById("status");
const statusContainer = document.getElementById("statusContainer");
const weirdChars2 = "ⱠICⱧØS§₮ME☤☥☒☨☩"


let sanityPercent = 100;
let attacked = false;
let attack = 0;
let sanityDrainInterval;

function updateSanity(){
    if(attacked){
        sanityPercent -= attack;
        attacked = false;
    }
    if(sanityPercent <= 0){
        sanityProgress.style.width = '0%';
        sanity.textContent = "INSANE";
       
    }
    else if (sanityPercent >= 0){
        sanityProgress.style.width = sanityPercent.toString() + '%';
        sanity.textContent = sanityPercent.toString() + '%';
    }
}

const targets = [clock, systemInfo, control, Status, statusContainer];
function applyGlitch(){
    targets.forEach((element)=>{
        element.classList.add("glitch-text");
        element.dataset.text = element.textContent;
    });

    if (!sanityDrainInterval) {
        sanityDrainInterval = setInterval(()=>{
            sanityPercent = Math.max(0, sanityPercent - 1);
        }, 1000);
    }
}

let count = 0;
const fix = document.getElementById("fix");
fix.addEventListener("click", ()=>{
    count += 1;
    if(count >= 10){
        targets.forEach((element =>{
        element.classList.remove("glitch-text");
        delete element.dataset.text;
        }))
        clearInterval(sanityDrainInterval);
        sanityDrainInterval = null;
        count = 0;
    }
    
})

const comfort = document.getElementById("comfort");
const meds = document.getElementById("meds");
const sleep = document.getElementById("sleep");
let comfortCooldown = false;

comfort.addEventListener("click", ()=>{
    let cooldown = speed * 5;
    if(!comfortCooldown){
        sanityPercent += 1;
        comfortCooldown = true;
        setTimeout(()=>{
            comfortCooldown = false;
        }, cooldown)
    }  
})

meds.addEventListener("click", ()=>{
    
})

function corruptLines(str){
    let result = "";
    for(let i = 0; i < str.length; i++){
        if(str[i] != ':' && Math.random() * sanityPercent < 1 || str[i] != ' ' && Math.random() * sanityPercent < 1 || str[i] != '/' && Math.random() * sanityPercent < 1){
            result += weirdChars[Math.floor(Math.random() * weirdChars.length)];
        }
        else{
            result += str[i];
        }
    }
    return result;
}

function corruptLines2(str){
    let result = "";
    for(let i = 0; i < str.length; i++){
        if(str[i] != ':' && Math.random() * sanityPercent < 1 || str[i] != ' ' && Math.random() * sanityPercent < 1 ){
            result += weirdChars2[Math.floor(Math.random() * weirdChars2.length)];
        }
        else{
            result += str[i];
        }
    }
    return result;
}

function corruptSystem(){
    setTime.textContent = corruptLines2("Set Time");
    reset.textContent = corruptLines2("Reset");
    
    if(sanityPercent <= 70 && sanityPercent > 40){
        Status.textContent = corruptLines("UNSTABLE");
        systemInfo.textContent = corruptLines("WIN OS // CHRONOS // MONITOR_v2.3");
        statusContainer.textContent = corruptLines("STATUS: ");
    }
    else if(sanityPercent <= 40 && sanityPercent > 0){
        Status.textContent = corruptLines("BROKEN");
        systemInfo.textContent = corruptLines("GLITCH OS // 👁👁👁 // MONITOR_v6.6");
        statusContainer.textContent = corruptLines("STATUS: ");
    }
    else if(sanityPercent <= 0){
        control.textContent = "[ CO⚠N⚠ROL_PAN⚠L ]";
        Status.textContent = corruptLines("BROKEN");
        systemInfo.textContent = corruptLines("GLITCH OS // 👁👁👁 // MONITOR_v6.6");
        statusContainer.textContent = corruptLines("STATUS: ");
    }
    else{
        Status.textContent = corruptLines("STABLE");
        systemInfo.textContent = corruptLines("WIN OS // CHRONOS // MONITOR_v2.3");
    }
}

const effectsBoard = document.getElementById("effectsBoard");
const effects = effectsBoard.getContext('2d');
effectsBoard.width = window.innerWidth;
effectsBoard.height = window.innerHeight;
let mouseX;
let mouseY;
let eyeAttack;
let eyeDone = true;
let activeEyes = null;
let eyeTimer;
let eyeWidth = 45;
let eyeHeight = 20;
let spacing = 70;
let centerX;
let centerY;

window.addEventListener("mousemove", (Event)=>{
    mouseX = Event.clientX;
    mouseY = Event.clientY;
})

function drawEyes(){
    eyeDone = false;
    centerX = Math.random() * effectsBoard.width;
    centerY = Math.random() * effectsBoard.height;

    if(centerX >= (body.width - clock.width)/2 || centerX <= body.width - (body.width - clock.width/2)){
        centerX = Math.random() * effectsBoard.width;
    }
    if(centerY >= (body.height - clock.height)/2 || centerX <= body.height - (body.height - clock.height/2)){
        centerY = Math.random() * effectsBoard.height;
    }

   
    eyeAttack = false;

    effects.save();
    effects.fillStyle = 'rgba(255, 70, 70, 0.99)';
    effects.shadowColor = 'rgba(255, 35, 35, 0.9)';
    effects.shadowBlur = 18;

    effects.beginPath();
    effects.ellipse(centerX - spacing / 2, centerY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
    effects.fill();


    effects.beginPath();
    effects.ellipse(centerX + spacing / 2, centerY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
    effects.fill();

    effects.restore();

    activeEyes = { centerX, centerY, eyeWidth, eyeHeight, spacing };
    const eyes = activeEyes;
    eyeTimer = setTimeout(()=>{
        if (activeEyes !== eyes) return;

        eyeAttack = true;
        eyeDone = true;
        activeEyes = null;
        eyeTimer = null;
        effects.clearRect(0, 0, effectsBoard.width, effectsBoard.height);
    }, speed * 5);
}

window.addEventListener("click", (event) => {
    if (!activeEyes) return;

    const rect = effectsBoard.getBoundingClientRect();
    const x = (event.clientX - rect.left) * effectsBoard.width / rect.width;
    const y = (event.clientY - rect.top) * effectsBoard.height / rect.height;
    const { centerX, centerY, eyeWidth, eyeHeight, spacing } = activeEyes;

    const hitsEye = (eyeX) =>
        ((x - eyeX) / (eyeWidth / 2)) ** 2 +
        ((y - centerY) / (eyeHeight / 2)) ** 2 <= 1;

    if (hitsEye(centerX - spacing / 2) || hitsEye(centerX + spacing / 2)) {
        clearTimeout(eyeTimer);
        eyeTimer = null;
        eyeAttack = false;
        activeEyes = null;
        eyeDone = true;
        effects.clearRect(0, 0, effectsBoard.width, effectsBoard.height);
    }
});


function drawEffects(){
    if(Math.random() * sanityPercent < 20){
        if(eyeDone){
            effects.clearRect(0,0,effectsBoard.width, effectsBoard.height);
            drawEyes();
        }
    }
    if(Math.random() * sanityPercent < 50){
        applyGlitch();
    }
}

drawEffects();

function checkAttack(){
    if(eyeAttack){
        attacked = true;
        attack = 3;
        eyeAttack = false;
    }
    else{
        attack = 0;
    }
    attacked = true;
}
