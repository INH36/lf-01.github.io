import Banner from './mod/banaer.js';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 初始化轮播图
  const banner = new Banner({
    containerId: 'banner',      
    indicatorId: 'bannerChange',  
    images: [                    
      './img/banner/b_1.jpg',
      './img/banner/b_2.jpg',
      './img/banner/b_3.jpg'
    ],
    interval: 5000,               // 自动播放间隔时间（毫秒）
    fadeTime: 500                 // 动画过渡时间（毫秒）
  });
  banner.init()
  
});