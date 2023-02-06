const PORT = "3000";
const SERVER = `/`;
const PARAMS = { greeting: "hello" };
const socket = io.connect(SERVER, { transports: ["websocket"] });

let clicks = 0;
let count = 0;
let x;
let pCoords = [];
let allCoords = [[0]];
let pMouseX;
let pMouseY;
let coords = [[]];
let tempCoord = [];
let img;
let promptVar;
let playerColor;
let defaultCoords;
let namesList = [];


function pickWinner() {
  var avatarIds = document.getElementById("player1");
  avatarIds.classList.add("avatar-div-win-case");
  var avatarIds = document.getElementById("player2");
  avatarIds.classList.add("avatar-div-win-case");
  var avatarIds = document.getElementById("player3");
  avatarIds.classList.add("avatar-div-win-case");
  var avatarIds = document.getElementById("player4");
  avatarIds.classList.add("avatar-div-win-case");

  // document.getElementsByClassName("avatar-div").classList.add("avatar-div-win-case");
}

function writePrompt() {
  document.getElementById("prompt-text").innerHTML = promptVar;
}
function onTimesUp() {
  clearInterval(timerInterval);
  pickWinner();
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
  writePrompt();
  startTimer();
  promptChosen = true;
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
  socket.emit("pageStartUp")
  socket.on("playerList",  (player1, player2, player3, player4) => {
    namesList = [player1.player1Identifier[1].toString(), player2.player2Identifier[1].toString(), player3.player3Identifier[1].toString(), player4.player4Identifier[1].toString()];
    playerAvatars = [player1.player1Identifier[0].toString(), player2.player2Identifier[0].toString(), player3.player3Identifier[0].toString(), player4.player4Identifier[0].toString()];
  });

  //player1
  document.getElementById("player1-name").innerHTML = namesList[0];

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

  myColor();

};

function setup() {
  canvasHeight = (window.innerHeight)*.8;
canvasWidth = ((window.innerWidth)*.8)-120;
if (canvasHeight>canvasWidth) {
  canvasHeight=canvasWidth;
} else {
  canvasWidth=canvasHeight;
}
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(255);

  line(width / 2, height, width / 2, 0);
  line(width, height / 2, 0, height / 2);
  textSize(32);
  strokeWeight(4);
}

function draw() {
  getCoords();
}

socket.on("receiveCoords", (pCoords) => {
  defaultCoords = pCoords;
  coords = [defaultCoords[0]*canvasWidth, defaultCoords[1]*canvasHeight, defaultCoords[2]*canvasWidth, defaultCoords[3]*canvasHeight, defaultCoords[4]];
  console.log(coords);
  console.log("received");
  drawLine();
});

function drawLine() {
  playerColor = coords[4];
  console.log(playerColor);
  if (playerColor == "red") {
    stroke(245, 54, 54);
    line(coords[0], coords[1], coords[2], coords[3]);
  } else if (playerColor == "yellow") {
    stroke(245, 235, 54);
    line(coords[0], coords[1], coords[2], coords[3]);
  } else if (playerColor == "blue") {
    stroke(54, 169, 245);
    line(coords[0], coords[1], coords[2], coords[3]);
  } else if (playerColor == "green") {
    stroke(54, 245, 92);
    line(coords[0], coords[1], coords[2], coords[3]);
  } else if (playerColor == "purple") {
    stroke(194, 54, 245);
    line(coords[0], coords[1], coords[2], coords[3]);
  } else {
    stroke(0);
    line(coords[0], coords[1], coords[2], coords[3]);
    console.log("error");
  }
  line(coords[0], coords[1], coords[2], coords[3]);
}

function getCoords() {
  socket.emit("getCoords"); // emit a "getCoords" event
  socket.on("coords", (pCoords) => {
    coords = pCoords;
  });
}
