const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();

const signallingServer = require("./server/signalling-server.js");

const PORT = process.env.PORT || 5500;

// Server all the static files from www folder
app.use(express.static(path.join(__dirname, "www")));
app.use(express.static(path.join(__dirname, "icons")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "node_modules/vue/dist/")));

server.listen(PORT, null, () => {
  console.log("Server", {
    listening_on: "http://localhost:" + PORT,
    node_version: process.versions.node,
  });
});

app.get("/legal", (req, res) =>
  res.sendFile(path.join(__dirname, "www/legal.html"))
);

// All URL patterns should served with the same file.
app.get(["/", "/:room"], (req, res) =>
  res.sendFile(path.join(__dirname, "www/index.html"))
);

io.sockets.on("connection", signallingServer);
