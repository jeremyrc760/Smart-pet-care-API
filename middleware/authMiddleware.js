// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// 保护路由用的中间件
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  // 期待格式：Authorization: Bearer xxxxxx
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // 把用户信息挂到 req 上，后面 controller 可以用
      req.user = { id: decoded.id };
      next();
    } catch (err) {
      console.error("JWT verify error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { protect };
