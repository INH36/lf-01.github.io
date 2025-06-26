import Banner from './mod/banner.js';
import ViewportAnimation from './mod/viewport-animation.js';
import http from '../api/http.js'

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
  
  const viewportAnimation = new ViewportAnimation({
    // 每个数组对应一个容器的文本元素
    text_dom_list_id: [
      ["text_1", "text_2", "text_3"],  // serveRange 容器的文本元素
      ["team_text_title"],            // team 容器的文本元素
      ["now_title"]                   // now 容器的文本元素
    ],
    // 为每个容器设置不同的文本动画方向
    text_to_direction: ['right', 'left', 'left'],
    // 每个数组对应一个容器的图片元素
    img_dom_list_id: [
      ["img_1", "img_2", "img_3", "img_4"],  // serveRange 容器的图片元素
      ["team_img_1", "team_img_2", "team_img_3"],  // team 容器的图片元素
      ["now_img_1", "now_img_2", "now_img_3", "now_img_4"]
    ],
    // 所有需要观察的容器 ID
    container_id: ["serveRange", "team", "now"],
    animationDuration: 500, // 动画持续0.5秒
    staggerDelay: 200       // 元素间错开0.2秒，单位毫秒
  });
  viewportAnimation.init();
});

http.get('/api/hot_nows').then(res => {
    console.log(res);
})