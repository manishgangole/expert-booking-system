require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("joinExpert", (expertId) => {
    socket.join(expertId);
  });
});

app.use("/experts", require("./routes/expertRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

server.listen(process.env.PORT, () =>
  console.log("Server running")
);