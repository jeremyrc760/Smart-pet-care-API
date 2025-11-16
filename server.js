// commonJS

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

//读取.env
dotenv.config();

//连接MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//root router - for testing
app.get("/",(req,res) => {
    res.send("SmartFeeder API is running with server.js (CommonJS)");

});

//挂载相关路由
app.use("/api/user", userRoutes);

// Start the server
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})