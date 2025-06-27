// 基本效果
class baseStyle {
    constructor(){}

    // 抽屉效果
    drawer(){
        const drawer = document.querySelector('.fixed');
        const moveBtn = document.querySelector('.xl\\:hidden img');
        const closeBtn = document.querySelector('.fixed img');

        // 初始化抽屉位置
        drawer.style.transform = 'translateX(100%)';
        drawer.style.transition = 'transform 0.3s ease-in-out';

        // 点击移动图标显示抽屉
        moveBtn.addEventListener('click', () => {
            drawer.style.transform = 'translateX(0)';
        });

        // 点击关闭图标隐藏抽屉
        closeBtn.addEventListener('click', () => {
            drawer.style.transform = 'translateX(100%)';
        });
    }
}

export default new baseStyle();