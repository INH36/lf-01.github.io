import Banner from './mod/home/banner.js';
import ViewportAnimation from './mod/viewport-animation.js';
import {initNew} from './mod/home/new.js'
import { initTeam } from './mod//home/team.js';


// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', async() => {
  
  await initNew()
  initTeam()

  // 初始化轮播图 - 优化懒加载版本
  const banner = new Banner({
    containerId: 'banner',
    indicatorId: 'bannerChange',
    images: [
      './img/banner/b_1.jpg',
      './img/banner/b_2.jpg',
      './img/banner/b_3.jpg',
      './img/banner/b_4.jpg',
      './img/banner/b_5.jpg'
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
      ["new_title"],
      []
    ],
    text_to_direction: ['right', 'left', 'left', 'right', 'left'],
    img_dom_list_id: [
      ["img_1", "img_2", "img_3", "img_4"],
      [],
      ["team_img_1", "team_img_2", "team_img_3"],
      [],
      ["new_img_1", "new_img_2", "new_img_3", "new_img_4"]
    ],
    container_id: ["serveRange", "team", "team_img", "new", "new_img"],
    animationDuration: 500, // 动画持续0.5秒
    staggerDelay: 200       // 元素间错开0.2秒，单位毫秒
  });
  viewportAnimation.init();

});