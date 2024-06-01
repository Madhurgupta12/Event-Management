const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv');
const pdfDetails=require("./model/pdfDetails");
app.use("/files", express.static("files"));
dotenv.config();
app.use(cors());
app.use(express.json());
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const { title, userId } = req.body; // Destructure title and userId from req.body
    const fileName = req.file.filename;
    console.log(userId);
    try {
      await pdfDetails.create({ title: title, pdf: fileName, userId: userId }); // Save userId along with title and fileName
      res.send({ status: "ok" });
    } catch (error) {
      res.json({ status: error });
    }
  });
  

  
    
  
  app.get("/get-files", async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters
    
    try {
      pdfDetails.find({ userId: userId }).then((data) => { // Fetch files for the specific userId
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
      res.json({ status: error });
    }
  });
  
const userRouter=require("./routes/user");
const taskRouter=require("./routes/task");
const remainder=require("./routes/remainder")
const profileRouter =require("./routes/profile");
const {connectDB}=require("./db/db")
app.use("/user",userRouter);
app.use("/api",taskRouter);
app.use("/api",remainder);
app.use("/api",profileRouter);
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

