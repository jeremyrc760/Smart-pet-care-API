// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // 引入 Mongoose 模型

// 生成 JWT
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "dev-secret-123456";
  console.log("JWT_SECRET used:", secret);
  return jwt.sign(
    { id: user._id, username: user.username },
    secret,
    { expiresIn: "7d" }
  );
};

// 注册用户
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查参数完整性
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // 检查是否重复
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户并保存到 MongoDB
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // 返回响应
    return res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser),
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

// 登录用户
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 登录成功
    return res.json({
      message: "Login successful",
      token: generateToken(user),
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// 获取当前用户资料（需要中间件验证 token）
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // 不返回密码字段
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("❌ Get profile error:", error.message);
    return res.status(500).json({ message: "Server error fetching profile" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
