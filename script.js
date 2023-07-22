const startTimerBtn = document.getElementById("startTimerBtn");
const activeTimersDisplay = document.getElementById("activeTimersDisplay");
const timerEndDisplay = document.getElementById("timerEndDisplay");
const alertSound = document.getElementById("alertSound");
const paragraph = document.getElementById("para");

let timers = [];

startTimerBtn.addEventListener("click", () => {
  paragraph.style.display = "none";
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  if (!isNaN(hours) || !isNaN(minutes) || !isNaN(seconds)) {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      createTimer(totalSeconds);
    }
  }
});


function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}


function updateTimersDisplay() {
  activeTimersDisplay.innerHTML = ""; 

  timers.forEach((timer, index) => {
    const timerDiv = document.createElement("div");
    timerDiv.className = "timer";
    timerDiv.innerHTML = `
    <div style="margin-right: 20px">
          <p style="color: white">Time Left :</p>
        </div>
      <div class=run-time style="margin-left: 150px">  
    <span class="timer-remaining">${formatTime(timer.remainingTime)}</span>
      </div>
      <button class="stop-timer-btn" data-index="${index}">Stop</button>
    `;

    activeTimersDisplay.appendChild(timerDiv);
  });
}


function playAlertSound() {
  alertSound.currentTime = 0; 
  alertSound.play();
}

function stopTimer(index) {
  clearInterval(timers[index].intervalId);
  timers[index].intervalId = null; 
 
  updateTimersDisplay();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("stop-timer-btn")) {
    const index = parseInt(event.target.dataset.index);
    stopTimer(index);
  }
});

function createTimer(totalSeconds) {
  const timer = {
    remainingTime: totalSeconds,
    intervalId: null,
  };

  timer.intervalId = setInterval(() => {
    timer.remainingTime--;

    if (timer.remainingTime <= 0) {
      clearInterval(timer.intervalId);
      timerEndDisplay.textContent = "Timer Is Up !";
      timerEndDisplay.style.display = "block";
      playAlertSound();
      setTimeout(() => {
      
        activeTimersDisplay.style.display = "none";
      }, 2000); 
      setTimeout(() => {
        timerEndDisplay.style.display = "none";
    
      }, 2000);
    }

    updateTimersDisplay();
  }, 1000);

  timers.push(timer);
  updateTimersDisplay();
}