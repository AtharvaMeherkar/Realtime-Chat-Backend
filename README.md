# Real-time Chat Application Backend (Node.js with Socket.IO)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![WebSockets](https://img.shields.io/badge/Protocol-WebSockets-blue?style=for-the-badge)
![Realtime](https://img.shields.io/badge/Communication-Realtime-red?style=for-the-badge)
![Backend](https://img.shields.io/badge/Development-Backend-blueviolet?style=for-the-badge)

## Project Overview

This project is a robust Node.js backend server designed to power a simple, real-time, room-based chat application. It leverages **WebSockets via Socket.IO** to enable instant, bidirectional communication between the server and connected clients. This project serves as a compelling demonstration of core concepts in real-time communication, event-driven architecture, and managing persistent connections, which are fundamental for modern interactive applications like live chat platforms, collaborative editing tools, and online gaming.

## Key Features

* **Real-time Communication:**
    * Utilizes **WebSockets (via Socket.IO)** for low-latency, full-duplex communication, ensuring messages are delivered instantly.
    * Demonstrates persistent connections essential for live updates.
* **Room-Based Chat:**
    * Supports the creation and joining of distinct chat "rooms."
    * Messages sent in one room are precisely broadcast only to other users within that same room, showcasing effective message segmentation and isolation.
* **Event-Driven Architecture:**
    * The server is meticulously designed to handle various WebSocket events, providing a responsive and scalable chat system. Key events managed include:
        * `connect`: When a new client successfully establishes a WebSocket connection.
        * `joinRoom`: When a user explicitly requests to enter a specific chat room, leaving previous rooms if applicable.
        * `chatMessage`: When a user sends a text message.
        * `disconnect`: When a user gracefully leaves the chat or loses connection.
* **User Management (Simplified):**
    * Basic in-memory management of connected users, storing their chosen username and current room directly on the socket object for easy identification.
* **Flexible Message Emission:**
    * Demonstrates different ways to send messages based on context:
        * `socket.emit`: To send a message exclusively to the specific sender.
        * `socket.to(room).emit`: To broadcast a message to all users in a specific room, *excluding* the sender.
        * `io.in(room).emit`: To broadcast a message to all users in a specific room, *including* the sender.
* **Node.js & Express.js Foundation:**
    * The backend is built on the Node.js runtime, leveraging the Express.js framework to serve a simple HTML/JavaScript client for testing purposes and to provide the underlying HTTP server for Socket.IO.
* **CORS Configuration:**
    * Properly configured with `cors` middleware to handle cross-origin requests, allowing a frontend client from a different domain (e.g., your local browser during development) to connect securely without access issues.

## Technologies Used

* **Node.js:** The JavaScript runtime environment for executing server-side code, known for its non-blocking I/O and efficiency.
* **Express.js:** A fast, unopinionated, and minimalist web framework for Node.js, used for setting up HTTP routes and serving static files.
* **Socket.IO:** A powerful and widely-used library that enables real-time, bidirectional, and event-based communication between web clients and servers. It intelligently handles WebSocket handshakes, fallbacks (like long polling), and robust connection management.
* **HTML5, CSS3, JavaScript:** Used for the accompanying simple client-side chat interface (`public/index.html`) which serves to test the backend functionality.

## How to Download and Run the Project

### 1. Prerequisites

* **Node.js (which includes npm):** Ensure Node.js is installed on your system. Download the LTS (Long Term Support) version from [nodejs.org](https://www.nodejs.org/downloads/).
* **Git:** Ensure Git is installed on your system. Download from [git-scm.com](https://git-scm.com/downloads/).
* **VS Code (Recommended):** For a smooth development experience with its integrated terminal.

### 2. Download the Project

1.  **Open your terminal or Git Bash.**
2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)AtharvaMeherkar/RealtimeChatBackend.git
    ```
3.  **Navigate into the project directory:**
    ```bash
    cd RealtimeChatBackend
    ```

### 3. Setup and Installation

1.  **Open the project in VS Code:**
    ```bash
    code .
    ```
2.  **Open the Integrated Terminal in VS Code** (`Ctrl + ~`).
3.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

### 4. Execution

1.  **Ensure you are in the `RealtimeChatBackend` directory** in your VS Code terminal.
2.  **Start the server:**
    ```bash
    node server.js
    ```
3.  The server will start and listen on `http://localhost:3000`. You will see messages in your terminal indicating the server is running and logging events. **Keep this terminal window open** as long as you want the chat backend to be accessible.

### 5. Testing the Real-time Chat

To fully appreciate the real-time functionality, you need to simulate multiple users.

1.  **Open your web browser** and go to `http://localhost:3000`.
2.  **Open multiple browser tabs or windows** (e.g., 2 or 3 tabs) and navigate to `http://localhost:3000` in each.
3.  **In each tab/window:**
    * Enter a **unique Username** (e.g., "Alice", "Bob", "Charlie").
    * Enter a **Room Name** (e.g., "general", "dev-chat", "gaming"). Make sure some tabs join the *same* room and some join *different* rooms to test room isolation.
    * Click **"Join Room"**.
    * Once joined, type messages into the "Type your message..." input field and press Enter or click "Send".
4.  **Observe the Real-time Interaction:**
    * Messages sent in one tab will instantly appear in all other tabs that are in the *same room*.
    * Messages sent in a different room will *not* appear in tabs that are not in that room.
    * Observe the VS Code terminal where `server.js` is running for logs of connections, disconnections, and messages. This provides insight into the server-side event flow.

![image](https://github.com/user-attachments/assets/a751e6c1-d50c-44f3-abaf-5b38ef528f28)
![image](https://github.com/user-attachments/assets/f90764a5-bf3c-4436-890d-29b0f4d56c4f)
![image](https://github.com/user-attachments/assets/1977f790-6c95-4643-b924-d097253b8b76)


## What I Learned / Challenges Faced

* **Real-time Communication with WebSockets:** Gained hands-on experience in implementing real-time, bidirectional communication between clients and a server, a critical skill for interactive web applications.
* **Event-Driven Architecture:** Mastered handling various WebSocket events (connection, disconnection, custom messages, room joins) to build a responsive and scalable chat system.
* **Room-Based Messaging:** Understood and implemented the logic for segmenting chat conversations into distinct rooms, demonstrating effective message routing and isolation.
* **Backend Development with Node.js & Express:** Utilized the Node.js runtime and Express.js framework to build a robust and efficient backend for real-time functionalities.
* **Asynchronous Programming:** Leveraged Node.js's non-blocking I/O model for efficient handling of multiple concurrent client connections, crucial for high-performance real-time systems.
* **Client-Server Interaction:** Developed a basic HTML/JavaScript client to demonstrate and test the real-time communication capabilities of the backend, understanding the full communication loop.
