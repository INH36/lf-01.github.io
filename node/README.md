# EchoChat Server

这是一个基于 Node.js、Express 和 MongoDB 的 EchoChat 应用后端服务。

## 项目设置

1.  **安装依赖**: 

    ```bash
    npm install
    ```

2.  **配置环境变量**: 

    创建 `.env` 文件在项目根目录，并添加必要的配置，例如数据库连接字符串、JWT 密钥等。

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    # 其他配置...
    ```

## 运行项目

### 开发模式

使用 ts-node-dev 启动开发服务器，支持热重载。

```bash
npm run dev
```

### 生产模式

（如果需要，可以添加生产环境的构建和启动说明）

## API 文档

（待补充）

## 贡献

（待补充）