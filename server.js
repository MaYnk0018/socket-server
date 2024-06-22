const io = require("socket.io")(3000, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific HTTP methods
  },
});

const user = {};

io.on("connection", (socket) => {
  // console.log('New connection');
  socket.on("chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      naam: user[socket.id],
    });
  });
  socket.on("new-user", (naam) => {
    user[socket.id] = naam;

    socket.broadcast.emit("user-connected", naam);
  });
});
io.on("disconnect", () => {
  socket.broadcast.emit("user disconnected", user[socket.id]);
  delete user[socket.id];
});
