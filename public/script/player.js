const socket = io();
let pCoords = [];
let pMouseX;
let pMouseY;
let drawCoords = [[]];
let tempCoord = [];
let img;
let otherPlayerColors;
let button;
let coords = [0, 0, 0, 0, ""];
let promptVar;
let promptChosen = false;
let playerColor = location.pathname.toString().substring(8);
let ogCoords;
let defaultCoords;
let stopDraw=false;
let myTempId = location.pathname.substring(7,8);



console.log(playerColor);

//assign colors
function myColor() {
  switch (playerColor) {
    case "red":
      stroke(245, 54, 54);
      console.log("red");
      break;
    case "yellow":
      stroke(245, 235, 54);
      break;
    case "blue":
      stroke(54, 169, 245);
      break;
    case "green":
      stroke(54, 245, 92);
      break;
    case "purple":
      stroke(194, 54, 245);
      break;
    default:
      stroke(0);
      console.log("DEFAULT");
  }
}

function writePrompt() {
  document.getElementById("prompt-text").innerHTML = "Prompt: " + promptVar;

}

function onTimesUp() {
  clearInterval(timerInterval);
  stopDraw=true;

}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("time-display").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("timer-color").classList.remove(warning.color);
    document.getElementById("timer-color").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("timer-color").classList.remove(info.color);
    document.getElementById("timer-color").classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("timer-color")
    .setAttribute("stroke-dasharray", circleDasharray);
}

socket.on("promptPush", (promptIs) => {
  console.log(promptIs);
  promptVar = promptIs.prompt.toString();
  promptChosen = true;
  console.log(promptChosen);
  startTimer();
  writePrompt();
});

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

window.onload = function () {
    socket.on("playerList", () => {
      console.log(myTempId);
    switch (myTempId) {
      case `1`:
  document.getElementById("player-position").innerText = "Top-Left";
  document.getElementById("player-position").id="player1";
        break;
      case `2`:
  document.getElementById("player-position").innerText = "Top-Right";
  document.getElementById("player-position").id="player2";
        break;
      case `3`:
  document.getElementById("player-position").innerText = "Bottom-Left";
  document.getElementById("player-position").id="player3";
        break;
      case `4`:
  document.getElementById("player-position").innerText = "Bottom-Right";
  document.getElementById("player-position").id="player4";
        break;
      default:
        console.error("error");
        break;
        // I don't get why the error doesn't print but this bit does
    }
  });

  myColor();

  document.getElementById("timer").innerHTML = `
        <div class="base-timer">
          <svg id="timer-svg" viewBox="0 0 100 100">
            <g id="timer-circle">
              <circle id="time-background-color" cx="50" cy="50" r="45"></circle>
              <path
                id="timer-color"
                stroke-dasharray="283"
                class="timer-color ${remainingPathColor}"
                d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
              ></path>
            </g>
          </svg>
          <span id="time-display">${formatTime(timeLeft)}</span>
        </div>
        `;
};

function setup() {
  canvasHeight = window.innerHeight * 0.8;
canvasWidth = window.innerWidth * 0.8;
if (canvasHeight > canvasWidth) {
  canvasHeight = canvasWidth;
} else {
  canvasWidth = canvasHeight;
}
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(255);

  line(width / 2, height, width / 2, 0);
  line(width, height / 2, 0, height / 2);
  textSize(32);
  strokeWeight(4);
}

function draw() {
  fill(0);
}

function mouseDragged() {
  if (!mouseIsPressed) return;
  if (!promptChosen) return;
  if (stopDraw) return;
  switch (location.pathname.substring(0, 8)) {
    case `/player1`:
      if (mouseX > canvasWidth * 0.5 || mouseY > canvasHeight * 0.5) return;
      line(mouseX, mouseY, pmouseX, pmouseY);
      ogCoords = [mouseX, mouseY, pmouseX, pmouseY, playerColor];
      coords = [mouseX/canvasWidth, mouseY/canvasHeight, pmouseX/canvasWidth, pmouseY/canvasHeight, playerColor];

      break;
    case "/player2":
      if (mouseX < canvasWidth * 0.5 || mouseY > canvasHeight * 0.5) return;
      line(mouseX, mouseY, pmouseX, pmouseY);
      ogCoords = [mouseX, mouseY, pmouseX, pmouseY, playerColor];
      coords = [mouseX/canvasWidth, mouseY/canvasHeight, pmouseX/canvasWidth, pmouseY/canvasHeight, playerColor];
      
      break;
    case "/player3":
      if (mouseX > canvasWidth * 0.5 || mouseY < canvasHeight * 0.5) return;
      line(mouseX, mouseY, pmouseX, pmouseY);
      ogCoords = [mouseX, mouseY, pmouseX, pmouseY, playerColor];
      coords = [mouseX/canvasWidth, mouseY/canvasHeight, pmouseX/canvasWidth, pmouseY/canvasHeight, playerColor];
      
      break;
    case "/player4":
      if (mouseX < canvasWidth * 0.5 || mouseY < canvasHeight * 0.5) return;
      line(mouseX, mouseY, pmouseX, pmouseY);
      ogCoords = [mouseX, mouseY, pmouseX, pmouseY, playerColor];
      coords = [mouseX/canvasWidth, mouseY/canvasHeight, pmouseX/canvasWidth, pmouseY/canvasHeight, playerColor];

      break;
    default:
      ogCoords = [mouseX, mouseY, pmouseX, pmouseY, playerColor];
      coords = [mouseX/canvasWidth, mouseY/canvasHeight, pmouseX/canvasWidth, pmouseY/canvasHeight, playerColor];
      console.log(location.pathname.substring(0, 8));
      console.log("default draw");
      break;
  }

  socket.emit("sendCoords", coords);
  console.log("sendCoords");
}

// host code ~~

function draw() {
  getCoords();
}

socket.on("receiveCoords", (pCoords) => {
  defaultCoords = pCoords;
  drawCoords = [defaultCoords[0]*canvasWidth, defaultCoords[1]*canvasHeight, defaultCoords[2]*canvasWidth, defaultCoords[3]*canvasHeight];
  console.log(drawCoords);
  console.log("received");
  drawLine();
});

function drawLine() {
  if (mouseIsPressed) return;
  stroke(0);
  line(drawCoords[0], drawCoords[1], drawCoords[2], drawCoords[3]);
  myColor();
}

function getCoords() {
  socket.emit("getCoords");
  socket.on("coords", (pCoords) => {
    drawCoords = pCoords;
  });
}
