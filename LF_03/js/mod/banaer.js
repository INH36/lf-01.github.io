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
    this.showImage(0);
    this.bindEvents();
    this.startAutoPlay();
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
      imgDiv.style.backgroundImage = `url(${src})`;
      imgDiv.style.backgroundSize = 'cover';
      imgDiv.style.backgroundPosition = 'center';
      imgDiv.dataset.index = index;
      this.imageContainer.appendChild(imgDiv);
    });
  }


  // 创建指示器
  createIndicators() {
    this.indicatorContainer.innerHTML = '';
    
    this.images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'w-3 h-3 rounded-full border border-white cursor-pointer relative';
      indicator.dataset.index = index;
      
      // 创建进度环
      const progressRing = document.createElement('svg');
      progressRing.className = 'absolute top-0 left-0 w-full h-full';
      progressRing.innerHTML = `
        <circle 
          cx="6" 
          cy="6" 
          r="5" 
          fill="none" 
          stroke="white" 
          stroke-width="1" 
          stroke-dasharray="31.4" 
          stroke-dashoffset="31.4"
          class="progress-ring"
        />
      `;
      
      indicator.appendChild(progressRing);
      this.indicatorContainer.appendChild(indicator);
    });
  }


  // 显示图片
  showImage(index) {
    const allImages = this.imageContainer.querySelectorAll('div[data-index]');
    allImages.forEach(img => {
      img.classList.remove('opacity-100');
      img.classList.add('opacity-0');
    });

    const currentImage = this.imageContainer.querySelector(`div[data-index="${index}"]`);
    if (currentImage) {
      currentImage.classList.remove('opacity-0');
      currentImage.classList.add('opacity-100');
    }
    this.updateIndicators(index);
    this.currentIndex = index;
  }
 
  // 更新指示器
  updateIndicators(activeIndex) {
    const indicators = this.indicatorContainer.querySelectorAll('div[data-index]');
    indicators.forEach(indicator => {
      indicator.classList.remove('bg-white');
      indicator.classList.remove('active');
      const progressRing = indicator.querySelector('.progress-ring circle');
      if (progressRing) {
        progressRing.setAttribute('stroke-dashoffset', '31.4');
      }
    });

    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${activeIndex}"]`);
    if (activeIndicator) {
      activeIndicator.classList.add('active');
      
      if (!this.isPaused) {
        const progressRing = activeIndicator.querySelector('.progress-ring circle');
        if (progressRing) {
          progressRing.style.transition = 'none';
          progressRing.setAttribute('stroke-dashoffset', '31.4');
          
          void progressRing.offsetWidth;
          
          progressRing.style.transition = `stroke-dashoffset ${this.interval / 1000}s linear`;
          progressRing.setAttribute('stroke-dashoffset', '0');
        }
      }
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
      clearInterval(this.timer);
    }
    
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.nextImage();
      }
    }, this.interval);
  }

  // 暂停自动播放
  pauseAutoPlay() {
    this.isPaused = true;
    
    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${this.currentIndex}"]`);
    if (activeIndicator) {
      const progressRing = activeIndicator.querySelector('.progress-ring circle');
      if (progressRing) {
        const computedStyle = window.getComputedStyle(progressRing);
        const strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
        progressRing.style.transition = 'none';
        progressRing.setAttribute('stroke-dashoffset', strokeDashoffset.toString());
      }
    }
  }

  // 继续自动播放
  resumeAutoPlay() {
    this.isPaused = false;
    
    const activeIndicator = this.indicatorContainer.querySelector(`div[data-index="${this.currentIndex}"]`);
    if (activeIndicator) {
      const progressRing = activeIndicator.querySelector('.progress-ring circle');
      if (progressRing) {
        const computedStyle = window.getComputedStyle(progressRing);
        const strokeDashoffset = parseFloat(computedStyle.strokeDashoffset);
        const remainingTime = (strokeDashoffset / 31.4) * this.interval;
        
        progressRing.style.transition = `stroke-dashoffset ${remainingTime / 1000}s linear`;
        progressRing.setAttribute('stroke-dashoffset', '0');
      }
    }
  }

  // 切换
  bindEvents() {
    this.indicatorContainer.addEventListener('click', (e) => {
      const indicator = e.target.closest('div[data-index]');
      if (indicator) {
        const index = parseInt(indicator.dataset.index, 10);
        this.showImage(index);
      }
    });

    this.container.addEventListener('mouseenter', () => {
      this.pauseAutoPlay();
    });

    this.container.addEventListener('mouseleave', () => {
      this.resumeAutoPlay();
    });
  }

  // 销毁
  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    this.indicatorContainer.removeEventListener('click', this.handleIndicatorClick);
    this.container.removeEventListener('mouseenter', this.handleMouseEnter);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}