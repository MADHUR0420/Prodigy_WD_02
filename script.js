let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
  } else {
    startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerText = "Stop";
  }
  isRunning = !isRunning;
}

function lapReset() {
  if (isRunning) {
    let lapTime = Date.now() - startTime;
    laps.push(lapTime);
    let li = document.createElement("li");
    li.innerText = formatTime(lapTime);
    document.getElementById("laps").appendChild(li);
  } else {
    reset();
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById("display").innerText = "00:00:00.000";
  document.getElementById("startStop").innerText = "Start";
  laps = [];
  document.getElementById("laps").innerHTML = "";
  isRunning = false;
}

function updateDisplay() {
  let elapsed = Date.now() - startTime;
  document.getElementById("display").innerText = formatTime(elapsed);
}

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = date.getUTCMinutes().toString().padStart(2, "0");
  let seconds = date.getUTCSeconds().toString().padStart(2, "0");
  let milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}
