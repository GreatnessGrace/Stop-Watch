let isRunning = false;
let startTime = 0; 
let elapsedTime = 0; 
let intervalId;

const timeDisplay = document.querySelector(".time");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = isRunning ? currentTime - startTime : elapsedTime;
    const formattedTime = formatTime(elapsedTime);
    timeDisplay.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}

function toggleRun() {
    if (isRunning) {
        clearInterval(intervalId);
        startStopButton.textContent = "Start";
    } else {
        if (!startTime) {
            startTime = Date.now();
        }
        intervalId = setInterval(updateDisplay, 1000);
        startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0; 
    timeDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
}

startStopButton.addEventListener("click", toggleRun);
resetButton.addEventListener("click", reset);
