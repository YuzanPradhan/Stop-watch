let timer;
let isRunning = false;
let startTime = 0; // Record the start time
let elapsedTime = 0; // Time elapsed since the stopwatch started

function updateDisplay() {
    const display = document.getElementById('display');
    const now = Date.now();
    const timeElapsed = isRunning ? elapsedTime + (now - startTime) : elapsedTime;
    
    const totalMilliseconds = timeElapsed % 1000;
    const totalSeconds = Math.floor(timeElapsed / 1000) % 60;
    const totalMinutes = Math.floor(timeElapsed / (1000 * 60)) % 60;
    const totalHours = Math.floor(timeElapsed / (1000 * 60 * 60));
    
    display.textContent = 
        String(totalHours).padStart(2, '0') + ':' + 
        String(totalMinutes).padStart(2, '0') + ':' + 
        String(totalSeconds).padStart(2, '0') + '.' + 
        String(Math.floor(totalMilliseconds / 10)).padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now(); // Record the current time as the start time
        timer = setInterval(() => {
            updateDisplay();
        }, 10); // Update display every 10 milliseconds
        document.getElementById('startStopBtn').textContent = 'Stop';
        isRunning = true;
    } else {
        clearInterval(timer);
        document.getElementById('startStopBtn').textContent = 'Start';
        isRunning = false;
        elapsedTime += Date.now() - startTime; // Update elapsed time
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
}

function loadState() {
    if (isRunning) {
        startStopwatch(); // Restore running state
    }
}

document.getElementById('startStopBtn').addEventListener('click', startStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);

// Load saved state when the page loads
window.addEventListener('load', loadState);
