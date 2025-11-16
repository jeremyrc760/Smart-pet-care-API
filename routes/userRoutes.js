// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 注册
router.post("/register", registerUser);

// 登录
router.post("/login", loginUser);

// 获取当前用户信息（需要登录）
router.get("/profile", protect, getProfile);

module.exports = router;
