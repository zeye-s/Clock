function updateClock(){
    const now = new Date();
    let hour = now.getHours();
    const military = hour >= 12 ? "AM" : "PM";
    hour = hour % 12 || 12;
    hour = hour.toString();
    const minute = now.getMinutes().toString();
    const second = now.getSeconds().toString();
    const time = `${hour}:${minute}:${second} ${military}`;
    document.getElementById("clock").textContent = time;

}

updateClock();
setInterval(updateClock, 1000);
