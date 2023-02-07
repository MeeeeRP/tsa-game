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
function avatarImage(playerAvatars) {
  var avatar1 = document.getElementById("player1-pic");
  var profile1 = document.getElementById("player1");
  var avatar2 = document.getElementById("player2-pic");
  var profile2 = document.getElementById("player2");
  var avatar3 = document.getElementById("player3-pic");
  var profile3 = document.getElementById("player3");
  var avatar4 = document.getElementById("player4-pic");
  var profile4 = document.getElementById("player4");

  switch (playerAvatars[0]) {
    case "red":
      avatar1.innerHTML = `<img id="player1-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile1.classList.add("avatar-red");
      break;
    case "yellow":
      avatar1.innerHTML = `<img id="player1-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile1.classList.add("avatar-yellow");
      break;
    case "blue":
      avatar1.innerHTML = `<img id="player1-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile1.classList.add("avatar-blue");
      break;
    case "green":
      avatar1.innerHTML = `<img id="player1-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile1.classList.add("avatar-green");
      break;
    case "purple":
      avatar1.innerHTML = `<img id="player1-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile1.classList.add("avatar-purple");
      break;
  }
  switch (playerAvatars[1]) {
    case "red":
      avatar2.innerHTML = `<img id="player2-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile2.classList.add("avatar-red");
      break;
    case "yellow":
      avatar2.innerHTML = `<img id="player2-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile2.classList.add("avatar-yellow");
      break;
    case "blue":
      avatar2.innerHTML = `<img id="player2-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile2.classList.add("avatar-blue");
      break;
    case "green":
      avatar2.innerHTML = `<img id="player2-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile2.classList.add("avatar-green");
      break;
    case "purple":
      avatar2.innerHTML = `<img id="player2-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile2.classList.add("avatar-purple");
      break;
  }
  switch (playerAvatars[2]) {
    case "red":
      avatar3.innerHTML = `<img id="player3-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile3.classList.add("avatar-red");
      break;
    case "yellow":
      avatar3.innerHTML = `<img id="player3-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile3.classList.add("avatar-yellow");
      break;
    case "blue":
      avatar3.innerHTML = `<img id="player3-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile3.classList.add("avatar-blue");
      break;
    case "green":
      avatar3.innerHTML = `<img id="player3-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile3.classList.add("avatar-green");
      break;
    case "purple":
      avatar3.innerHTML = `<img id="player3-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile3.classList.add("avatar-purple");
      break;
  }
  switch (playerAvatars[3]) {
    case "red":
      avatar4.innerHTML = `<img id="player4-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile4.classList.add("avatar-red");
      break;
    case "yellow":
      avatar4.innerHTML = `<img id="player4-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile4.classList.add("avatar-yellow");
      break;
    case "blue":
      avatar4.innerHTML = `<img id="player4-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile4.classList.add("avatar-blue");
      break;
    case "green":
      avatar4.innerHTML = `<img id="player4-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile4.classList.add("avatar-green");
      break;
    case "purple":
      avatar4.innerHTML = `<img id="player4-pic" class="avatar-pic" src="../avatar-sample.gif" alt=""/>`;
      profile4.classList.add("avatar-purple");
      break;
  }
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
  socket.on("playerList",  (players) => {
    console.log(players);
//    let parsedData=JSON.parse(players);
    let tempArray = players.playerList;
    console.log(tempArray[0][0])
    namesList = [tempArray[0][1], tempArray[1][1], tempArray[2][1], tempArray[3][1]];
    playerAvatars = [tempArray[0][0], tempArray[1][0], tempArray[2][0], tempArray[3][0]];
  
  //player1
  console.log(namesList[0]);
  document.getElementById("player1-name").innerHTML = namesList[0];

    //player2
    console.log(namesList[1]);
    document.getElementById("player2-name").innerHTML = namesList[1];
      //player3
  console.log(namesList[2]);
  document.getElementById("player3-name").innerHTML = namesList[2];
    //player4
    console.log(namesList[3]);
    document.getElementById("player4-name").innerHTML = namesList[3];

    avatarImage();

  
  });

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

  // myColor();

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
