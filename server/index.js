const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
const userRouter=require("./routes/user");
const taskRouter=require("./routes/task");
const {connectDB}=require("./db/db")
app.use("/api",userRouter);
app.use("/api",taskRouter);
app.listen(process.env.PORT,(req,res)=>{
    console.log(`sever is running on port ${process.env.PORT}`);
})

const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Action");

const server = http.createServer();  // Create an HTTP server without using Express
const io = new Server(server);

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
};

io.on("connection", (socket) => {
  console.log('Socket connected', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    
    // Notify that a new user joined
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Sync the code
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // When a new user joins the room, sync the existing code with them
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle user disconnect
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    
    // Notify other users in the room that a user has disconnected
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
  });

  socket.on("disconnect", () => {
    console.log('Socket disconnected', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


connectDB();

