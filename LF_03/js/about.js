// 性能优化：延迟初始化地图
function initMap() {
   
    window._AMapSecurityConfig = {
        securityJsCode: "f38ab2b78aee085005a1fd18718ae80c",
    };

    // 隐藏加载占位符
    const placeholder = document.getElementById('map-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    AMapLoader.load({
        key: "32d6025ec49fbbe6f721377faa4027e1",
        version: "2.0",
        plugins: []
    })
        .then((AMap) => {
            const container = document.getElementById('container');
            if (!container) {
                console.error('Map container not found');
                return;
            }

            const map = new AMap.Map("container", {
                zoom: 15,
                center: [119.241217, 26.053031],
                // 禁止所有地图操作以提升性能
                dragEnable: false,      // 禁止拖拽
                zoomEnable: false,      // 禁止缩放
                doubleClickZoom: false, // 禁止双击放大
                keyboardEnable: false,  // 禁止键盘操作
                scrollWheel: false,     // 禁止滚轮缩放
                touchZoom: false,       // 禁止触摸缩放
                rotateEnable: false,    // 禁止旋转
                animateEnable: false,   // 禁止动画
                jogEnable: false,       // 禁止缓动平移
                resizeEnable: true,     // 允许窗口调整大小
                showLabel: false,       // 隐藏标注以提升性能
            });

            // 添加标记点
            const marker = new AMap.Marker({
                position: map.getCenter(),
                offset: new AMap.Pixel(-13, -30),
                title: '公司位置'
            });

            map.add(marker);
        })

}

// 使用Intersection Observer实现懒加载
function setupMapLazyLoading() {
    const mapContainer = document.getElementById('container');
    if (!mapContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(initMap, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px' // 提前50px开始加载
    });

    observer.observe(mapContainer);
}

// 页面加载完成后设置懒加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMapLazyLoading);
} else {
    setupMapLazyLoading();
}