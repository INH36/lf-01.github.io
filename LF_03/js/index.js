import Banner from './mod/banner.js';
import ViewportAnimation from './mod/viewport-animation.js';
import {initNow} from './mod/now.js'

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', async() => {
  await initNow()
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
    text_dom_list_id: [
      ["text_1", "text_2", "text_3"],
      ["team_text_title"],
      [],
      ["now_title"],
      []
    ],
    text_to_direction: ['right', 'left', 'left', 'right', 'left'],
    img_dom_list_id: [
      ["img_1", "img_2", "img_3", "img_4"],
      [],
      ["team_img_1", "team_img_2", "team_img_3"],
      [],
      ["now_img_1", "now_img_2", "now_img_3", "now_img_4"]
    ],
    container_id: ["serveRange", "team", "team_img", "now", "now_img"],
    animationDuration: 500, // 动画持续0.5秒
    staggerDelay: 200       // 元素间错开0.2秒，单位毫秒
  });
  viewportAnimation.init();
});