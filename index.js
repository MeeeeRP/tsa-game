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
    } else {
      socket.emit("gameFull", {});
    }
  });

  socket.on("pickRoles", () => {
    min = Math.ceil(1);
    max = Math.floor(playerCount) + 1;
    let hostId = Math.floor(Math.random() * (max - min) + min);
    io.emit("rolesPicked", hostId);
  });

let player1Identifier;
let player2Identifier;
let player3Identifier;
let player4Identifier;

  socket.on("playerColorId", (color, username, id) => {
    // let playerColor = color;
    // playerId=id;
    console.log(color);
    console.log(username);
    console.log(id);
    switch (id) {
      case 1:
        player1Identifier = [color, username, id];
        console.log(player1Identifier);
        break;
      case 2:
        player2Identifier = [color, username, id];
        break;
      case 3:
        player3Identifier = [color, username, id];
        break;
      case 4:
        player4Identifier = [color, username, id];
    }
    //    io.emit("assignedColor", {playerColor, playerId});
  });
  socket.on("pageStartUp", () => {
    console.log("sending players..");
    console.log(player1Identifier);
    io.emit("playerList", player1Identifier, player2Identifier, player3Identifier, player4Identifier);
  });


});

app.get("/player*", (req, res) => {
  res.sendFile(__dirname + "/public/player/index.html");
});
