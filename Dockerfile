# 使用 Node.js 18 轻量镜像
FROM node:18-alpine

# 创建并进入工作目录
WORKDIR /app

# 先复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制全部源代码
COPY . .

# 设置默认环境变量
ENV PORT=5000

# 声明端口（方便云平台映射）
EXPOSE 5000

# 启动命令
CMD ["npm", "start"]
