# 🐾 Smart Pet Care - API

A Node.js + Express + MongoDB backend for the **Smart Pet Care System**, enabling secure data exchange between IoT devices and the front-end dashboard.  
This service handles user authentication, sensor data storage, and RESTful API endpoints for real-time monitoring.

---

## 🚀 Tech Stack

- **Node.js** + **Express** – Server framework  
- **MongoDB** + **Mongoose** – Database & ORM  
- **JWT** + **bcryptjs** – Authentication & password security  
- **CORS** + **dotenv** – Environment & API security setup  

---

## 📁 Project Structure
SmartFeeder-API/
│
├── config/ # Database connection & environment setup
├── controllers/ # Business logic (sensor & user handling)
├── middleware/ # Authentication (JWT) middleware
├── models/ # Mongoose models (User, Sensor, etc.)
├── routes/ # API route definitions
│ ├── sensorRoutes.js
│ └── userRoutes.js
│
├── server.js # Entry point (Express server)
├── package.json
├── .env # Environment variables (not pushed to Git)
└── .gitignore

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/jeremyrc760/Smart-pet-care-API.git
cd Smart-pet-care-API

npm install

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173

npm run dev
npm start
