import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nowRouter from './router/now';

dotenv.config();
const app = express();

// 配置CORS中间件允许所有域访问
app.use(cors());

app.use(express.json());
app.use('/api', nowRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EchoChat Server is running on http://localhost:${PORT}`);
});