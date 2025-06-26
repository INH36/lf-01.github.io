export default class Banner {

  constructor(options) {

    this.container = document.getElementById(options.containerId);     // 轮播图容器
    this.indicatorContainer = document.getElementById(options.indicatorId);     // 指示器容器
    this.images = options.images     // 轮播图片列表
    this.interval = options.interval || 5000;  // 播放时长
    this.fadeTime = options.fadeTime || 500;  // 动画时长
    this.currentIndex = 0; // 当前图片ID
    this.timer = null;  // 定时器
    this.isPaused = false; // 是否暂停
  }

  init() {
    this.createBannerStructure();
    this.createIndicators();
    this.preloadAndShowFirstImage();
    this.bindEvents();
    this.startAutoPlay();
  }

  // 预加载并显示第一张图片
  preloadAndShowFirstImage() {
    const firstImage = this.imageContainer.querySelector('div[data-index="0"]');
    if (firstImage) {
      firstImage.classList.remove('opacity-0');
      firstImage.classList.add('opacity-100');
    } else {
      console.error('未找到第一张图片元素');
    }
    // 设置当前索引为0
    this.currentIndex = 0;
    
    // 初始化指示器，但不立即启动动画
    this.updateIndicators(0, false);
    
    // 预加载第二张图片
    this.preloadNextImage(0);
    
    // 短暂延迟后启动指示器动画，确保DOM已完全渲染
    setTimeout(() => {
      this.updateIndicators(0, true);
    }, 100);
  }


  // 创建轮播图结构
  createBannerStructure() {
    this.imageContainer = document.createElement('div');
    this.imageContainer.className = 'w-full h-full relative overflow-hidden';
    this.container.appendChild(this.imageContainer);

    this.images.forEach((src, index) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'absolute top-0 left-0 w-full h-full opacity-0 transition-opacity';
      imgDiv.style.transitionDuration = `${this.fadeTime / 1000}s`;
      imgDiv.style.backgroundSize = 'cover';
      imgDiv.style.backgroundPosition = 'center';
      imgDiv.dataset.index = index;
      if (index === 0) {
        imgDiv.style.backgroundImage = `url(${src})`;
      } else {
        imgDiv.dataset.src = src;
      }

      // 添加加载指示器
      const loader = document.createElement('div');
      loader.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      loader.innerHTML = '<div class="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>';
      loader.style.display = 'none';
      imgDiv.appendChild(loader);

      this.imageContainer.appendChild(imgDiv);
    });
    // 初始化懒加载
    this.initLazyLoading();
  }

  // 初始化懒加载
  initLazyLoading() {
    // 创建IntersectionObserver实例
    const options = {
      root: null, // 使用视口作为观察区域
      rootMargin: '0px', // 视口边距
      threshold: 0.1 // 当目标元素10%进入视口时触发回调
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgDiv = entry.target;
          const src = imgDiv.dataset.src;

          if (src) {
            // 显示加载指示器
            const loader = imgDiv.querySelector('div');
            if (loader) {
              loader.style.display = 'block';
            }

            // 创建一个新的Image对象来预加载图片
            const img = new Image();
            img.onload = () => {
              // 图片加载完成后设置背景
              imgDiv.style.backgroundImage = `url(${src})`;
              // 移除data-src属性表示已加载
              delete imgDiv.dataset.src;

              // 隐藏加载指示器
              if (loader) {
                loader.style.display = 'none';
              }
            };
            // 移除懒加载属性，确保图片能够立即加载
            img.src = src;

            // 图片开始加载后停止观察该元素
            observer.unobserve(imgDiv);
          }
        }
      });
    }, options);

    // 观察所有图片元素
    const imgDivs = this.imageContainer.querySelectorAll('div[data-index]');
    imgDivs.forEach(imgDiv => {
      observer.observe(imgDiv);
    });
  }


  // 创建指示器
  createIndicators() {
    this.images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator-container relative';
      indicator.dataset.index = index;

      // 创建SVG指示器
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.classList.add('indicator-svg');
      
      // 背景圆
      const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      backgroundCircle.setAttribute('cx', '12');
      backgroundCircle.setAttribute('cy', '12');
      backgroundCircle.setAttribute('r', '6');
      backgroundCircle.setAttribute('fill', 'transparent');
      backgroundCircle.setAttribute('stroke', 'white');
      backgroundCircle.setAttribute('stroke-width', '1');
      backgroundCircle.classList.add('indicator-circle');
      
      // 进度环
      const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      progressCircle.setAttribute('cx', '12');
      progressCircle.setAttribute('cy', '12');
      progressCircle.setAttribute('r', '6');
      progressCircle.setAttribute('fill', 'transparent');
      progressCircle.setAttribute('stroke', 'white');
      progressCircle.setAttribute('stroke-width', '2');
      progressCircle.setAttribute('stroke-dasharray', '37.7');
      progressCircle.setAttribute('stroke-dashoffset', '37.7');
      progressCircle.classList.add('progress-ring__circle');
      
      svg.appendChild(backgroundCircle);
      svg.appendChild(progressCircle);
      indicator.appendChild(svg);
      this.indicatorContainer.appendChild(indicator);
    });
  }


  // 显示图片
  showImage(index) {
    // 先隐藏所有图片
    const allImages = this.imageContainer.querySelectorAll('div[data-index]');
    allImages.forEach(img => {
      img.classList.remove('opacity-100');
      img.classList.add('opacity-0');
    });

    // 获取当前需要显示的图片
    const currentImage = this.imageContainer.querySelector(`div[data-index="${index}"]`);
    if (currentImage) {
      // 检查图片是否已加载，如果未加载则立即加载
      if (currentImage.dataset.src && !currentImage.style.backgroundImage) {
        // 显示加载指示器
        const loader = currentImage.querySelector('div');
        if (loader) {
          loader.style.display = 'block';
        }

        const src = currentImage.dataset.src;
        const img = new Image();
        img.onload = () => {
          // 图片加载完成后设置背景
          currentImage.style.backgroundImage = `url(${src})`;
          delete currentImage.dataset.src;

          // 隐藏加载指示器
          if (loader) {
            loader.style.display = 'none';
          }

          // 确保图片加载后显示
          setTimeout(() => {
            currentImage.classList.remove('opacity-0');
            currentImage.classList.add('opacity-100');
          }, 10); // 添加小延迟确保DOM更新
        };

        // 立即加载图片
        img.src = src;
      } else {
        // 图片已加载，直接显示
        setTimeout(() => {
          currentImage.classList.remove('opacity-0');
          currentImage.classList.add('opacity-100');
        }, 10); // 添加小延迟确保DOM更新
      }
    }

    // 预加载下一张图片
    this.preloadNextImage(index);

    // 统一更新指示器和当前索引
    this.updateIndicators(index, !this.isPaused);
    this.currentIndex = index;
  }

  // 预加载下一张图片
  preloadNextImage(currentIndex) {
    // 计算下一张图片的索引
    const nextIndex = (currentIndex + 1) % this.images.length;
    const nextImage = this.imageContainer.querySelector(`div[data-index="${nextIndex}"]`);

    // 如果下一张图片存在且尚未加载，则预加载
    if (nextImage && nextImage.dataset.src && !nextImage.style.backgroundImage) {
      // 显示加载指示器
      const loader = nextImage.querySelector('div');
      if (loader) {
        loader.style.display = 'block';
      }

      const src = nextImage.dataset.src;
      const img = new Image();

      img.onload = () => {
        nextImage.style.backgroundImage = `url(${src})`;
        delete nextImage.dataset.src;

        // 隐藏加载指示器
        if (loader) {
          loader.style.display = 'none';
        }
      };

      // 开始加载图片，移除懒加载属性
      img.src = src;
    }
  }

  // 更新指示器（统一的指示器更新方法）
  updateIndicators(activeIndex, startAnimation = true) {
    const indicators = this.indicatorContainer.querySelectorAll('div[data-index]');

    if (indicators.length === 0) {
      console.error('未找到指示器元素');
      return;
    }

    // 重置所有指示器
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
      const progressCircle = indicator.querySelector('.progress-ring__circle');
      if (progressCircle) {
        progressCircle.style.transition = 'none';
        progressCircle.setAttribute('stroke-dashoffset', '37.7');
      }
    });

    // 激活当前指示器
    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${activeIndex}"]`);
    if (activeIndicator) {
      activeIndicator.classList.add('active');

      // 获取进度环元素
      const progressCircle = activeIndicator.querySelector('.progress-ring__circle');
      if (progressCircle) {
        // 重置动画
        progressCircle.style.transition = 'none';
        progressCircle.setAttribute('stroke-dashoffset', '37.7');

        // 触发重排以重新启动动画
        void progressCircle.offsetWidth;

        // 根据参数决定是否启动动画
        if (startAnimation && !this.isPaused) {
          // 设置新的过渡效果和偏移量
          progressCircle.style.transition = `stroke-dashoffset ${this.interval / 1000}s linear`;
          progressCircle.setAttribute('stroke-dashoffset', '0');
        }
      }
    } else {
      console.error('未找到激活的指示器元素，索引：', activeIndex);
    }
  }


  // 下一张图片
  nextImage() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage(nextIndex);
  }

  // 上一张图片
  prevImage() {
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage(prevIndex);
  }

  // 自动播放
  startAutoPlay() {
    // 清除现有定时器
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // 使用setTimeout进行精确控制
    this.timer = setTimeout(() => {
      if (!this.isPaused) {
        this.nextImage();
        this.startAutoPlay(); // 递归调用以继续自动播放
      }
    }, this.interval);
  }

  // 暂停自动播放
  pauseAutoPlay() {
    this.isPaused = true;
    
    // 清除定时器
    if (this.timer) {
      clearTimeout(this.timer);
    }

    // 停止当前指示器动画
    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${this.currentIndex}"]`);
    if (activeIndicator) {
      const progressCircle = activeIndicator.querySelector('.progress-ring__circle');
      if (progressCircle) {
        // 获取当前动画进度
        const computedStyle = window.getComputedStyle(progressCircle);
        const currentOffset = parseFloat(computedStyle.strokeDashoffset);
        
        // 停止过渡动画
        progressCircle.style.transition = 'none';
        
        // 确保偏移量在合理范围内（0到37.7之间）
        const clampedOffset = Math.max(0, Math.min(37.7, currentOffset));
        progressCircle.setAttribute('stroke-dashoffset', clampedOffset.toString());
      }
    }
  }

  // 继续自动播放
  resumeAutoPlay() {
    // 如果已经不是暂停状态，不执行任何操作
    if (!this.isPaused) return;
    
    this.isPaused = false;
    
    // 获取当前指示器的进度
    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${this.currentIndex}"]`);
    if (activeIndicator) {
      const progressCircle = activeIndicator.querySelector('.progress-ring__circle');
      if (progressCircle) {
        const currentOffset = parseFloat(progressCircle.getAttribute('stroke-dashoffset'));
        
        // 如果进度条已经接近完成（偏移量小于等于5），直接切换到下一张
        if (currentOffset <= 5) {
          this.nextImage();
          this.startAutoPlay();
          return;
        }
        
        // 计算剩余时间（基于当前进度）
        const progress = (37.7 - currentOffset) / 37.7; // 当前进度百分比
        const remainingTime = this.interval * (1 - progress); // 剩余时间
        
        // 继续当前指示器的动画
        progressCircle.style.transition = `stroke-dashoffset ${remainingTime / 1000}s linear`;
        progressCircle.setAttribute('stroke-dashoffset', '0');
        
        // 设置定时器在剩余时间后切换到下一张
        this.timer = setTimeout(() => {
          if (!this.isPaused) {
            this.nextImage();
            this.startAutoPlay();
          }
        }, remainingTime);
      } else {
        // 如果没有找到进度圆环，重新开始完整周期
        this.updateIndicators(this.currentIndex, true);
        this.startAutoPlay();
      }
    } else {
      // 如果没有找到活动指示器，重新开始完整周期
      this.updateIndicators(this.currentIndex, true);
      this.startAutoPlay();
    }
  }

  // 绑定事件
  bindEvents() {
    // 点击指示器切换图片
    this.indicatorContainer.addEventListener('click', (e) => {
      const indicator = e.target.closest('div[data-index]');
      if (indicator) {
        const index = parseInt(indicator.dataset.index, 10);
        this.showImage(index);
      }
    });

    // 鼠标进入轮播图区域，暂停自动播放
    this.container.addEventListener('mouseenter', () => {
      this.pauseAutoPlay();
    });

    // 鼠标离开轮播图区域，恢复自动播放
    this.container.addEventListener('mouseleave', () => {
      this.resumeAutoPlay();
    });

    // 添加左右箭头点击事件（如果存在）
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.prevImage();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.nextImage();
      });
    }

  }
}