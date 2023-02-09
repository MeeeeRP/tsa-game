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
let promptVar;
let playerColor;
let defaultCoords;
let namesList = [];
let hostId = location.pathname.substring(5, 6);
let player1=false;
let player2=false;
let player3=false;
let player4=false;
let reran=false;
let winStage=false;

function repeatGame() {
  socket.emit("pickRoles");
  console.log("game go again");
}

socket.on("pointsAssigned", () => {
winStage=false;
const fillerP = document.querySelector("div:last-child");
const nextRoundButton = document.createElement("button");
nextRoundButton.innerHTML = `<button id="repeat-start" onClick="repeatGame()" class="hide-button">Next round!</button>`;
fillerP.nextRoundButton.replace(nextRoundButton, fillerP);
document.getElementById("repeat-start").classList.add("show-button");

// repeatGame();


});

function givePlayerPoints(player) {
  console.log("attempted");
  if (!winStage) return;
  console.log("succeeded");
  socket.emit("assignPoints", { player });
  if (player == 1) {
    document.getElementById("player1").classList.add("winner1");
  } else if (player == 2) {
    document.getElementById("player2").classList.add("winner2");
  } else if (player == 3) {
    document.getElementById("player3").classList.add("winner3");
  } else if (player == 4) {
    document.getElementById("player4").classList.add("winner4");
  } else {
    console.log(player);
    console.error("somethign went wrong");
  }
  document.getElementById("player1").classList.remove("avatar-div-win-case");
  // let avatarIds = document.getElementById("player2");
  document.getElementById("player2").classList.remove("avatar-div-win-case");
  // let avatarIds = document.getElementById("player3");
  document.getElementById("player3").classList.remove("avatar-div-win-case");
  // let avatarIds = document.getElementById("player4");
  document.getElementById("player4").classList.remove("avatar-div-win-case");
}

function pickWinner() {
  // let avatarIds = document.getElementById("player1");
  document.getElementById("player1").classList.add("avatar-div-win-case");
  // let avatarIds = document.getElementById("player2");
  document.getElementById("player2").classList.add("avatar-div-win-case");
  // let avatarIds = document.getElementById("player3");
  document.getElementById("player3").classList.add("avatar-div-win-case");
  // let avatarIds = document.getElementById("player4");
  document.getElementById("player4").classList.add("avatar-div-win-case");

  winStage=true;
  // document.getElementsByClassName("avatar-div").classList.add("avatar-div-win-case");
}

function avatarImage(checkId1, checkId2, checkId3, checkId4, checkId5) {
  console.log(playerAvatars);
  if ((checkId1 !== 5)&&(!player1)) {
    console.log("player1 set");
    player1=true;
    console.log(playerAvatars[0]);
    switch (playerAvatars[0]) {
      case "red":
        document.getElementById(
          "player1-pic"
        ).src = "tsa.game.conor.idle.png";
        document.getElementById("player1").classList.add("avatar-red");
        break;
      case "yellow":
        document.getElementById(
          "player1-pic"
        ).src = "tsa.game.deena.idle.png";
        document.getElementById("player1").classList.add("avatar-yellow");
        break;
      case "blue":
        document.getElementById(
          "player1-pic"
        ).src = "tsa.game.maya.idle.png";
        document.getElementById("player1").classList.add("avatar-blue");
        break;
      case "green":
        document.getElementById(
          "player1-pic"
        ).src = "tsa.game.elijah.idle.png";
        document.getElementById("player1").classList.add("avatar-green");
        break;
      case "purple":
        document.getElementById(
          "player1-pic"
        ).src = "tsa.game.gayatri.idle.png";
        document.getElementById("player1").classList.add("avatar-purple");
        break;
      default:
        console.error("problem...");
        break;
    }
  }
  if ((checkId2 !== 5)&&(!player2)) {
    console.log("player2 set");
    player2=true;
    console.log(playerAvatars[1]);
    switch (playerAvatars[1]) {
      case "red":
        document.getElementById(
          "player2-pic"
        ).src = "tsa.game.conor.idle.png";
        document.getElementById("player2").classList.add("avatar-red");
        break;
      case "yellow":
        document.getElementById(
          "player2-pic"
        ).src = "tsa.game.deena.idle.png";
        document.getElementById("player2").classList.add("avatar-yellow");
        break;
      case "blue":
        document.getElementById(
          "player2-pic"
        ).src = "tsa.game.maya.idle.png";
        document.getElementById("player2").classList.add("avatar-blue");
        break;
      case "green":
        document.getElementById(
          "player2-pic"
        ).src = "tsa.game.elijah.idle.png";
        document.getElementById("player2").classList.add("avatar-green");
        break;
      case "purple":
        document.getElementById(
          "player2-pic"
        ).src = "tsa.game.gayatri.idle.png";
        document.getElementById("player2").classList.add("avatar-purple");
        break;
      default:
        console.error("problem...");
        break;
    }
  }
  if ((checkId3 !== 5)&&(!player3)) {
    console.log("player3 set");
    player3=true;
    console.log(playerAvatars[2]);
    switch (playerAvatars[2]) {
      case "red":
        document.getElementById(
          "player3-pic"
        ).src = "tsa.game.conor.idle.png";
        document.getElementById("player3").classList.add("avatar-red");
        break;
      case "yellow":
        document.getElementById(
          "player3-pic"
        ).src = "tsa.game.deena.idle.png";
        document.getElementById("player3").classList.add("avatar-yellow");
        break;
      case "blue":
        document.getElementById(
          "player3-pic"
        ).src = "tsa.game.maya.idle.png";
        document.getElementById("player3").classList.add("avatar-blue");
        break;
      case "green":
        document.getElementById(
          "player3-pic"
        ).src = "tsa.game.elijah.idle.png";
        document.getElementById("player3").classList.add("avatar-green");
        break;
      case "purple":
        document.getElementById(
          "player3-pic"
        ).src = "tsa.game.gayatri.idle.png";
        document.getElementById("player3").classList.add("avatar-purple");
        break;
      default:
        console.error("problem...");
        break;
    }
  }
  if ((checkId4 !== 5)&&(!player4)) {
    console.log("player4 set");
    player4=true;
    console.log(playerAvatars[3]);
    switch (playerAvatars[3]) {
      case "red":
        document.getElementById(
          "player4-pic"
        ).src = "tsa.game.conor.idle.png";
        document.getElementById("player4").classList.add("avatar-red");
        break;
      case "yellow":
        document.getElementById(
          "player4-pic"
        ).src = "tsa.game.deena.idle.png";
        document.getElementById("player4").classList.add("avatar-yellow");
        break;
      case "blue":
        document.getElementById(
          "player4-pic"
        ).src = "tsa.game.maya.idle.png";
        document.getElementById("player4").classList.add("avatar-blue");
        break;
      case "green":
        document.getElementById(
          "player4-pic"
        ).src = "tsa.game.elijah.idle.png";
        document.getElementById("player4").classList.add("avatar-green");
        break;
      case "purple":
        document.getElementById(
          "player4-pic"
        ).src = "tsa.game.gayatri.idle.png";
        document.getElementById("player4").classList.add("avatar-purple");
        break;
      default:
        console.error("problem...");
        break;
    }
  }
  if ((checkId5 !== 5)&&(!reran)) {
    console.log("rerun");
    reran=true;
    checkId1=0;
    checkId2=0;
    checkId3=0;
    checkId4=0;
    checkId5=0;
    avatarImage();
  }
}

function writePrompt() {
  document.getElementById("prompt-text").innerHTML = "Prompt: " + promptVar;
  document.getElementById("prompt-iframe").remove();
}

function onTimesUp() {
  clearInterval(timerInterval);
  pickWinner();
  // save(canvas, "round1.jpg");
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
  socket.emit("pageStartUp");
  socket.on("playerList", (players) => {
    console.log(players);
    //    let parsedData=JSON.parse(players);
    let tempArray = players.playerList;
    console.log(tempArray[0][0]);
    namesList = [
      tempArray[0][1],
      tempArray[1][1],
      tempArray[2][1],
      tempArray[3][1],
      tempArray[4][1],
    ];
    playerAvatars = [
      tempArray[0][0],
      tempArray[1][0],
      tempArray[2][0],
      tempArray[3][0],
      tempArray[4][0],
    ];
    let hostColor = playerAvatars[hostId-1];
    playerAvatars[hostId-1]=playerAvatars[4];
    playerAvatars[4]=hostColor;
    console.log(playerAvatars);
    console.log(playerAvatars[0]);
    console.log(playerAvatars[1]);
    console.log(playerAvatars[2]);
    console.log(playerAvatars[3]);
    console.log(playerAvatars[4]);
    playerIds = [
      tempArray[0][2],
      tempArray[1][2],
      tempArray[2][2],
      tempArray[3][2],
      tempArray[4][2],
    ];
    playerIds[4] = hostId;
    playerIds[hostId - 1] = 5;

    //player1
    console.log(namesList[0]);
    if (playerIds[0] !== 5) {
      document.getElementById("player1-name").innerHTML = namesList[0];
    } else {
      document.getElementById("player1-name").innerHTML = namesList[4];
    }

    //player2
    console.log(namesList[1]);
    if (playerIds[1] !== 5) {
      document.getElementById("player2-name").innerHTML = namesList[1];
    } else {
      document.getElementById("player2-name").innerHTML = namesList[4];
    }
    //player3
    console.log(namesList[2]);
    if (playerIds[2] !== 5) {
      document.getElementById("player3-name").innerHTML = namesList[2];
    } else {
      document.getElementById("player3-name").innerHTML = namesList[4];
    }
    //player4
    console.log(namesList[3]);
    if (playerIds[3] !== 5) {
      document.getElementById("player4-name").innerHTML = namesList[3];
    } else {
      document.getElementById("player4-name").innerHTML = namesList[4];
    }

    // let avatar1 = document.getElementById("player1-pic");
    // let profile1 = document.getElementById("player1");
    // let avatar2 = document.getElementById("player2-pic");
    // let profile2 = document.getElementById("player2");
    // let avatar3 = document.getElementById("player3-pic");
    // let profile3 = document.getElementById("player3");
    // let avatar4 = document.getElementById("player4-pic");
    // let profile4 = document.getElementById("player4");
    let checkId1=playerIds[0];
    let checkId2=playerIds[1];
    let checkId3=playerIds[2];
    let checkId4=playerIds[3];
    let checkId5=playerIds[4];
    avatarImage(checkId1, checkId2, checkId3, checkId4, checkId5);
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
  socket.on("rolesPicked", (host) => {
    console.log(host);
    hostId = host.toString();
    console.log(userId);
    if (hostId == userId) {
      console.log("You are the host");
      let imHost = true;
      document.location.href = `/host` + hostId;
      preventDefault();
      console.log("You are the host");
    } else if (userId == 5) {
      document.location.href = `/player` + hostId + playerColor;
      preventDefault();
    } else {
      document.location.href = `/player` + userId + playerColor;
      preventDefault();
    }
  });

};

function setup() {
  canvasHeight = window.innerHeight * 0.8;
  canvasWidth = window.innerWidth * 0.8 - 120;
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
  getCoords();
}

socket.on("receiveCoords", (pCoords) => {
  defaultCoords = pCoords;
  coords = [
    defaultCoords[0] * canvasWidth,
    defaultCoords[1] * canvasHeight,
    defaultCoords[2] * canvasWidth,
    defaultCoords[3] * canvasHeight,
    defaultCoords[4],
  ];
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
    console.error("error");
  }
  line(coords[0], coords[1], coords[2], coords[3]);
}

function getCoords() {
  socket.emit("getCoords"); // emit a "getCoords" event
  socket.on("coords", (pCoords) => {
    coords = pCoords;
  });
}
