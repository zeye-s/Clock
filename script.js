function updateClock(){
    const now = new Date();
    let hour = now.getHours();
    const military = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    hour = hour.toString();
    const minute = now.getMinutes().toString();
    const second = now.getSeconds().toString();
    const time = `${hour}:${minute}:${second} ${military}`;
    document.getElementById("clock").textContent = time;

}

updateClock();
setInterval(updateClock, 1000);

const canvas = document.getElementById("drawBoard");
const ctx = canvas.getContext('2d');
const binary = '01';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const chars = binary + alphabet;
const fontSize = 20;
const columns = canvas.width/(fontSize + 2);
const RETRO = "RETRO";

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