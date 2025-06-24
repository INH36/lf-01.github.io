document.addEventListener('DOMContentLoaded', function () {

    // 获取四个导航元素
    const navItems = Array.from(document.querySelectorAll('.main > div:not(.avatar)'));

    // 获取内容面板元素
    const contentPanel = document.getElementById('content-panel');
    const panelTitle = document.querySelector('.panel-title');
    const closeBtn = document.querySelector('.close-btn');
    const panels = document.querySelectorAll('.panel');

    // 面板标题映射
    const panelTitles = {
        'personal': '个人简介',
        'skills': '技术能力',
        'hobbies': '个人爱好',
        'contact': '联系方式'
    };

    // 为导航元素添加点击事件
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();          
            // 添加点击波纹效果
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            // 设置波纹位置和动画
            const rect = this.getBoundingClientRect();
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) * 2 + 'px';
            ripple.style.left = (e.clientX - rect.left - ripple.offsetWidth / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - ripple.offsetHeight / 2) + 'px';
            ripple.style.borderRadius = '50%';
            

            // 动画结束后移除波纹元素
            ripple.addEventListener('animationend', function () {
                ripple.remove();
            });

            // 获取面板ID
            const panelId = this.getAttribute('data-panel');
            const panelElement = document.getElementById(`${panelId}-panel`);

            if (panelElement) {
                panelTitle.textContent = panelTitles[panelId] || '详细信息';
                panels.forEach(panel => panel.classList.remove('active'));
                panelElement.classList.add('active');
                contentPanel.classList.remove('closing');
                contentPanel.classList.add('active');
                contentPanel.style.transformOrigin = 'right center';
                navItems.forEach(nav => nav.classList.remove('active-nav'));
                this.classList.add('active-nav');
            }
        });
    });

    // 为关闭按钮添加点击事件
    closeBtn.addEventListener('click', function () {
        contentPanel.classList.remove('active');
        contentPanel.classList.add('closing');
        contentPanel.style.transformOrigin = 'left center';
        navItems.forEach(nav => nav.classList.remove('active-nav'));
        setTimeout(() => {
            panels.forEach(panel => panel.classList.remove('active'));
        }, 300);
    });

    // 添加页面加载完成后的整体动画
    document.body.classList.add('loaded');
})