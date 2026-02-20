# Real-Time Expert Session Booking System

A full-stack real-time expert booking platform built using:

- React (Frontend)
- Node.js
- Express.js
- MongoDB
- Socket.io

This system allows users to browse experts, book time slots, prevent double booking, and see real-time slot updates.

---

## 🚀 Features

### 1️⃣ Expert Listing
- Fetch experts from backend
- Displays name, category, experience, rating
- Clean UI layout

### 2️⃣ Expert Detail Page
- Displays expert details
- Shows available time slots
- Booked slots are automatically disabled
- Real-time slot updates using Socket.io

### 3️⃣ Booking System
- Form validation
- Prevents double booking
- Shows success message
- Disables booked slot

### 4️⃣ My Bookings
- Fetch bookings by email
- Displays booking status:
  - Pending
  - Confirmed
  - Completed

### 5️⃣ Double Booking Prevention
A MongoDB compound unique index ensures that:

- Same expert
- Same date
- Same time slot

Cannot be booked twice (race-condition safe).

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- React Router
- Socket.io Client

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Socket.io
- dotenv
---
## 📂 Project Structure
expert-booking-system/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ └── App.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/manishgangole/expert-booking-system.git
cd expert-booking-system
```
## 2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start backend:

npm run dev

Backend runs at:

http://localhost:5000
## 3️⃣ Frontend Setup

Open new terminal:

cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
📡 API Endpoints
Experts

GET /experts

GET /experts/:id

Bookings

POST /bookings

GET /bookings?email=

GET /bookings?expertId=

PATCH /bookings/:id/status

## 🔄 Real-Time Updates

Users join expert-specific Socket.io rooms

When a booking is created:

Slot update event is emitted

All connected clients viewing that expert receive update instantly

## 🧠 Key Implementation Highlights

MVC backend architecture

Proper folder structure

Environment variables used

Compound unique index for race-condition safety

Real-time synchronization with Socket.io

Clean error handling

---
