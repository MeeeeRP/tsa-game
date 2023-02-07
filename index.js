const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
    allowEIO3: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

const io = require("socket.io")(server);

let clicks = 1;
let gameList = [];
let playerCount = 0;
let player1Identifier;
let player2Identifier;
let player3Identifier;
let player4Identifier;
let player5Identifier;
let playerList=[player1Identifier,player2Identifier,player3Identifier,player4Identifier,player5Identifier];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("prompt", (prompt) => {
    console.log(prompt);
    io.emit("promptPush", prompt);
  });

  socket.on("sendCoords", (coords) => {
    console.log("sendCoords");
    io.emit("receiveCoords", coords);
  });

  let names = [];

  socket.on("join", (name) => {
    if (playerCount < 5) {
      socket.playerId = playerCount + 1;
      playerCount++;
      socket.emit("assignedId", socket.playerId);
      console.log(socket.playerId);
      names.push(name);
      io.emit("assignedName", name);
      console.log(name);
      console.log(names);
      if (playerCount==5) {
        io.emit("gamefull", {} );
      }
    } else {
      io.emit("gamefull", {} );
      console.log("howwwww");
    }
  });

  socket.on("pickRoles", () => {
    min = Math.ceil(1);
    max = Math.floor(playerCount) + 1;
    let hostId = Math.floor(Math.random() * (max - min) + min);
    io.emit("rolesPicked", hostId);
  });

  socket.on("playerColorId", (color, username, id) => {
    // let playerColor = color;
    // playerId=id;
    console.log(color);
    console.log(username);
    console.log(id);
    let tempId = id.userId;
    let tempUsername = username.userName.toString();
    let tempColor = color.playerColor.toString();

    console.log(tempId);
    console.log(tempUsername);
    console.log(tempColor);

    if (tempId==1) {
      player1Identifier = [tempColor, tempUsername];
      console.log("player1 defined");
      console.log(player1Identifier);
      playerList[0]=player1Identifier;
    }
    if (tempId==2) {
      player2Identifier = [tempColor, tempUsername];
      console.log("player2 defined");
      playerList[1]=player2Identifier;
    }
    if (tempId==3) {
      player3Identifier = [tempColor, tempUsername];
      console.log("player3 defined");
      playerList[2]=player3Identifier;

    }
    if (tempId==4) {
      player4Identifier = [tempColor, tempUsername];
      console.log("player4 defined");
      playerList[3]=player4Identifier;

    }
    if (tempId==5) {
      player5Identifier = [tempColor, tempUsername];
      console.log("player5 defined");
      playerList[4]=player5Identifier;

    }
    // playerList = [
    //   player1Identifier,
    //   player2Identifier,
    //   player3Identifier,
    //   player4Identifier,
    //   player5Identifier,
    // ];
    // console.log(playerList[0][0]);
    //    io.emit("assignedColor", {playerColor, playerId});
  });
  socket.on("pageStartUp", () => {
    console.log("sending players..");
    console.log(playerList);
    io.emit("playerList", {playerList: playerList});
  });
});

app.get("/player*", (req, res) => {
  res.sendFile(__dirname + "/public/player/index.html");
});
