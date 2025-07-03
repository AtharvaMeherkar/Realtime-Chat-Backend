// server.js

const express = require("express");
const http = require("http"); // Node.js built-in HTTP module
const { Server } = require("socket.io"); // Import Server class from socket.io
const path = require("path"); // Node.js built-in path module

const app = express();
// Create an HTTP server instance from the Express app
const server = http.createServer(app);

// Initialize Socket.IO server and attach it to the HTTP server
// `cors` configuration is crucial here to allow connections from different origins (e.g., your browser)
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development. In production, specify your frontend URL.
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000; // Server will run on port 3000

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// --- Socket.IO Connection Handling ---

// Listen for new Socket.IO connections
io.on("connection", (socket) => {
  console.log(`[User Connected] Socket ID: ${socket.id}`);

  // Event: 'joinRoom' - Fired when a user wants to join a specific chat room
  socket.on("joinRoom", (roomName, username) => {
    // Leave any previously joined rooms to ensure user is only in one room at a time
    // (Optional: for multi-room support, skip this and manage multiple joins)
    const currentRooms = Array.from(socket.rooms).filter(
      (r) => r !== socket.id
    );
    currentRooms.forEach((room) => {
      socket.leave(room);
      console.log(`${username} left room: ${room}`);
      // Notify others in the old room that user left
      socket
        .to(room)
        .emit("message", "System", `${username} has left the chat.`);
    });

    // Join the new room
    socket.join(roomName);
    socket.data.username = username; // Store username on the socket object
    socket.data.room = roomName; // Store room name on the socket object

    console.log(
      `${username} (Socket ID: ${socket.id}) joined room: ${roomName}`
    );

    // Emit a welcome message to the user who just joined (only to their socket)
    socket.emit(
      "message",
      "System",
      `Welcome, ${username}! You have joined room: ${roomName}`
    );

    // Broadcast to all other users in the room that a new user has joined
    // `to(roomName)` targets a specific room
    // `except(socket.id)` excludes the sender from the broadcast
    socket
      .to(roomName)
      .emit("message", "System", `${username} has joined the chat.`);
  });

  // Event: 'chatMessage' - Fired when a user sends a message
  socket.on("chatMessage", (message) => {
    const username = socket.data.username || "Anonymous";
    const roomName = socket.data.room || "General"; // Default to 'General' if no room is set

    console.log(
      `[Message] Room: ${roomName}, User: ${username}, Message: ${message}`
    );

    // Emit the message to all users in the same room, including the sender
    // `in(roomName)` targets a specific room
    io.in(roomName).emit("message", username, message);
  });

  // Event: 'disconnect' - Fired when a user disconnects
  socket.on("disconnect", () => {
    const username = socket.data.username || "Anonymous";
    const roomName = socket.data.room; // Get the room the user was in

    console.log(
      `[User Disconnected] Socket ID: ${socket.id}, User: ${username}, Room: ${
        roomName || "N/A"
      }`
    );

    // If the user was in a room, broadcast their departure
    if (roomName) {
      socket
        .to(roomName)
        .emit("message", "System", `${username} has left the chat.`);
    }
  });
});

// --- Start the Server ---
server.listen(PORT, () => {
  console.log(`Chat backend server running on http://localhost:${PORT}`);
  console.log(
    "Open http://localhost:3000 in your browser to access the chat client."
  );
});
