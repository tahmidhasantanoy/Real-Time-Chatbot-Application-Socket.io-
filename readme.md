# 🚀 Real-Time Chatbot Application

A real-time private chat application built with **Node.js, Express, MongoDB, Socket.IO, and TypeScript**. Supports JWT-based auth and private 1-to-1 messaging.

---

## ✨ Features

* 🔐 JWT Authentication (Login & Protected Routes)
* 💬 Real-time private chat using Socket.IO
* 👥 User-to-user messaging
* 🗂 MongoDB + Mongoose
* ⚡ TypeScript-first backend

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express 5
* **Realtime**: Socket.IO
* **Database**: MongoDB + Mongoose
* **Auth**: JWT, bcrypt
* **Language**: TypeScript

---

## 📦 Installation (Run Locally)

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd real-time-chatbot-application
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatbot
JWT_SECRET=super_secret_key
```

> Make sure MongoDB is running locally.

---

### 4️⃣ Start the project

#### Run server (dev mode)

```bash
npm run dev:start
```

#### Watch TypeScript build

```bash
npm run watch:build
```

Server will start on:

```
http://localhost:5000
```

---

## 🔑 Test User (For Private Chat)

Use this user to test private messaging:

```txt
UserId : 693bfb292cad3adb3ab3a983
Email  : hamia@gmail.com
Password   : Asdf11!
```

After login, use the `userId` to open private chat routes or emit Socket.IO private events.

---

## 🔐 Auth Flow (Quick Overview)

1. Login with email & password
2. Server returns JWT token
3. Token is sent via headers
4. `authMiddleware` validates token
5. Private routes & socket events unlocked

---

## 📡 Socket.IO (Basic Idea)

* Each user joins a room using their `userId`
* Private messages are emitted to the target user's room
* Messages are stored in MongoDB

---



---

## 📁 Scripts

```json
"scripts": {
  "dev:start": "tsnd --respawn ./src/server.ts",
  "watch:build": "tsc -w"
}
```

---

## 🧠 Live link

 - https://real-time-chatbot-application-socke.vercel.app/

