import express from 'express';
import nowController from '../controllers/now';

const router = express.Router();

router.get("/hot_nows", nowController.getHotNow);  // 获取首页新闻动态

export default router;

