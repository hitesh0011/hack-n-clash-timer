let totalTime = 5; // Test time in seconds (replace with 2*60*60 for 2 hours)
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const mainContent = document.getElementById('mainContent');

// Format time HH : MM : SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2,'0')} : ${String(mins).padStart(2,'0')} : ${String(secs).padStart(2,'0')}`;
}

// Update timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
}

// Show Test Completed message
function showTestCompleted() {
    const audio = new Audio('./bell.mp3'); // Replace with your buzzer sound
    audio.play();

    mainContent.innerHTML = `
    <h1 class="text-6xl font-extrabold text-green-400 drop-shadow-lg">
        ⏰ Test Completed!
    </h1>
    <p class="text-2xl mt-4">Thank you for completing the test.</p>
    `;
}

// Start timer
startBtn.addEventListener('click', () => {
    if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
        } else {
        clearInterval(timerInterval);
        isRunning = false;
        updateDisplay();
        showTestCompleted(); // Show completed page dynamically
        }
    }, 1000);
    }
});

// Pause timer
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    }
});

// Reset timer
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    remainingTime = totalTime;
    updateDisplay();
});

// Initialize
updateDisplay();