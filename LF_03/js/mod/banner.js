export default class Banner {

  constructor(options) {

    this.container = document.getElementById(options.containerId);     // 轮播图容器
    this.indicatorContainer = document.getElementById(options.indicatorId);     // 指示器容器
    this.images = options.images     // 轮播图片列表
    this.interval = options.interval || 5000;  // 播放时长
    this.fadeTime = options.fadeTime || 500;  // 动画时长
    this.currentIndex = 1; // 当前图片ID
    this.timer = null;  // 定时器
    this.isPaused = false; // 是否暂停
    
    // 优化：添加图片加载状态管理
    this.loadedImages = new Set(); // 已加载的图片索引
    this.loadingImages = new Set(); // 正在加载的图片索引
    this.maxPreloadDistance = 1; // 最大预加载距离（当前图片前后各1张）
  }

  init() {
    this.createBannerStructure(); // 创建轮播图结构
    this.createIndicators(); // 创建指示器结构
    this.preloadAndShowFirstImage(); // 预加载并显示第一张图片
    this.bindEvents();  // 绑定事件
    this.startAutoPlay();  // 开启自动轮播
  }

  // 预加载并显示第一张图片
  preloadAndShowFirstImage() {
    const firstImage = this.imageContainer.querySelector('div[data-index="0"]');
    if (firstImage) {
      this.loadImage(firstImage).then(() => {
        firstImage.classList.remove('opacity-0');
        firstImage.classList.add('opacity-100');
        
        // 预加载相邻图片
        this.preloadAdjacentImages(0);
      }).catch((error) => {
        console.error('第一张图片加载失败:', error);
        // 即使加载失败也要显示，避免界面空白
        firstImage.classList.remove('opacity-0');
        firstImage.classList.add('opacity-100');
      });
    } else {
      console.error('未找到第一张图片元素');
    }
    
    this.currentIndex = 0;
    this.updateIndicators(0, false);
    
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
  }


  // 创建指示器
  createIndicators() {
    this.images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator-container relative';
      indicator.dataset.index = index;

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


  // 显示图片 - 优化懒加载版本
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
      // 优化：使用Promise处理图片加载，提供更好的错误处理
      this.loadImage(currentImage).then(() => {
        // 图片加载完成后显示
        setTimeout(() => {
          currentImage.classList.remove('opacity-0');
          currentImage.classList.add('opacity-100');
        }, 10);
      }).catch((error) => {
        console.error(`图片加载失败 (索引: ${index}):`, error);
        // 即使加载失败也要显示元素，避免界面卡住
        currentImage.classList.remove('opacity-0');
        currentImage.classList.add('opacity-100');
      });
    }

    // 预加载相邻图片
    this.preloadAdjacentImages(index);

    // 统一更新指示器和当前索引
    this.updateIndicators(index, !this.isPaused);
    this.currentIndex = index;
  }

  // 加载单张图片的通用方法
  loadImage(imageElement, showLoader = true) {
    return new Promise((resolve, reject) => {
      const index = parseInt(imageElement.dataset.index);
      
      // 如果图片已经加载，直接返回
      if (!imageElement.dataset.src || imageElement.style.backgroundImage || this.loadedImages.has(index)) {
        resolve();
        return;
      }

      // 如果图片正在加载，等待加载完成
      if (this.loadingImages.has(index)) {
        const checkLoaded = () => {
          if (this.loadedImages.has(index)) {
            resolve();
          } else if (!this.loadingImages.has(index)) {
            reject(new Error('Loading was cancelled'));
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
        return;
      }

      // 标记为正在加载
      this.loadingImages.add(index);
      
      const loader = imageElement.querySelector('div');
      const src = imageElement.dataset.src;

      // 显示加载指示器
      if (showLoader && loader) {
        loader.style.display = 'block';
      }

      const img = new Image();
      
      img.onload = () => {
        imageElement.style.backgroundImage = `url(${src})`;
        delete imageElement.dataset.src;
        
        // 更新加载状态
        this.loadingImages.delete(index);
        this.loadedImages.add(index);
        
        // 隐藏加载指示器
        if (loader) {
          loader.style.display = 'none';
        }
        
        resolve();
      };

      img.onerror = () => {
        console.error(`图片加载失败: ${src}`);
        
        // 更新加载状态
        this.loadingImages.delete(index);
        
        // 隐藏加载指示器
        if (loader) {
          loader.style.display = 'none';
        }
        reject(new Error(`Failed to load image: ${src}`));
      };

      // 设置超时处理
      const timeoutId = setTimeout(() => {
        if (this.loadingImages.has(index)) {
          img.onload = null;
          img.onerror = null;
          this.loadingImages.delete(index);
          
          if (loader) {
            loader.style.display = 'none';
          }
          reject(new Error(`Image load timeout: ${src}`));
        }
      }, 10000); // 10秒超时

      // 清理超时定时器
      img.onload = ((originalOnload) => {
        return function() {
          clearTimeout(timeoutId);
          originalOnload.call(this);
        };
      })(img.onload);
      
      img.onerror = ((originalOnerror) => {
        return function() {
          clearTimeout(timeoutId);
          originalOnerror.call(this);
        };
      })(img.onerror);

      img.src = src;
    });
  }

  // 预加载相邻图片
  preloadAdjacentImages(currentIndex) {
    const totalImages = this.images.length;
    
    // 只预加载指定距离内的图片
    for (let i = 1; i <= this.maxPreloadDistance; i++) {
      // 预加载下一张图片
      const nextIndex = (currentIndex + i) % totalImages;
      const nextImage = this.imageContainer.querySelector(`div[data-index="${nextIndex}"]`);
      
      // 预加载上一张图片
      const prevIndex = (currentIndex - i + totalImages) % totalImages;
      const prevImage = this.imageContainer.querySelector(`div[data-index="${prevIndex}"]`);

      // 异步预加载，不显示加载指示器
      if (nextImage && !this.loadedImages.has(nextIndex)) {
        this.loadImage(nextImage, false)
      }
      
      if (prevImage && !this.loadedImages.has(prevIndex)) {
        this.loadImage(prevImage, false)
      }
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
    if (this.timer) {
      clearTimeout(this.timer);
    }
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
        
        // 确保偏移量在合理范围内
        const clampedOffset = Math.max(0, Math.min(37.7, currentOffset));
        progressCircle.setAttribute('stroke-dashoffset', clampedOffset.toString());
      }
    }
  }

  // 继续自动播放
  resumeAutoPlay() {
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
    // 使用箭头函数确保this绑定正确，便于后续移除事件监听器
    this.handleIndicatorClick = (e) => {
      const indicator = e.target.closest('div[data-index]');
      if (indicator) {
        const index = parseInt(indicator.dataset.index, 10);
        this.showImage(index);
      }
    };

    this.handleMouseEnter = () => {
      this.pauseAutoPlay();
    };

    this.handleMouseLeave = () => {
      this.resumeAutoPlay();
    };

    this.handlePrevClick = () => {
      this.prevImage();
    };

    this.handleNextClick = () => {
      this.nextImage();
    };

    // 绑定事件监听器
    this.indicatorContainer.addEventListener('click', this.handleIndicatorClick);
    this.container.addEventListener('mouseenter', this.handleMouseEnter);
    this.container.addEventListener('mouseleave', this.handleMouseLeave);

    // 添加左右箭头点击事件（如果存在）
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');

    if (prevButton) {
      prevButton.addEventListener('click', this.handlePrevClick);
      this.prevButton = prevButton; // 保存引用以便清理
    }

    if (nextButton) {
      nextButton.addEventListener('click', this.handleNextClick);
      this.nextButton = nextButton; // 保存引用以便清理
    }

    // 添加页面可见性变化监听（性能优化）
    this.handleVisibilityChange = () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else if (!this.isPaused) {
        this.resumeAutoPlay();
      }
    };
    
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
}