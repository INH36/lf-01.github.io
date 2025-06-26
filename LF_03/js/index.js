import Banner from './mod/banner.js';
import ViewportAnimation from './mod/viewport-animation.js';

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
  banner.init();
  
  // 初始化视口进入动效
  const viewportAnimation = new ViewportAnimation({
    text_dom_list_id: ["text_1","text_2","text_3"],
    img_dom_list_id: ["img_1","img_2","img_3","img_4"],
    container_id: "serveRange",  // 容器id
    animationDuration: 500, // 动画持续0.5秒
    staggerDelay: 200       // 元素间错开0.2秒，单位毫秒
  });
  viewportAnimation.init();
});