// 获取DOM元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('.btn-clear');
const msgInput = document.querySelector('.msg-input');
const sendBtn = document.querySelector('.send');
// 弹幕数组和配置
let danmakus = [];
let MAX_DANMAKU_COUNT = 100;

// 设置canvas尺寸
function setCanvasSize() {
    const container = document.querySelector('.container');
    canvas.width = container.clientWidth - 40;
    canvas.height = container.clientHeight - 40;
}
setCanvasSize();

// 弹幕类
class Danmaku {
    constructor(text, isUser = false) {
        this.text = text;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * Math.random();
        this.angle = (Math.random() * 240 - 30) * Math.PI / 180;
        this.speed = 1 + Math.random();
        this.fontSize = 12 + Math.floor(Math.random() * 7);
        this.maxFontSize = Math.min(36, this.fontSize * 2);
        this.color = getRandomColor();
        this.alpha = 1;
        this.life = 0;
        this.maxLife = 200;
        this.isUser = isUser;
        this.scale = 1; // 缩放比例
        this.maxScale = 2; // 最大缩放比例
        this.textImage = null; // 文字图片
        this.createTextImage(); // 创建文字图片
    }

    // 更新位置
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        // 更新缩放比例而不是字体大小
        if (this.life < this.maxLife / 2) {
            this.scale = 1 + (this.maxScale - 1) * (this.life / (this.maxLife / 2));
        } else {
            this.alpha = 1 - (this.life - this.maxLife / 2) / (this.maxLife / 2);
        }

        return this.life < this.maxLife &&
            this.x > -100 && this.x < canvas.width + 100 &&
            this.y > -100 && this.y < canvas.height + 100;
    }

    // 创建文字图片
    createTextImage() {
        // 创建临时canvas用于生成文字图片
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        // 使用高分辨率倍数来提高图片质量
        const dpr = window.devicePixelRatio || 1;
        const highResScale = Math.max(2, dpr * this.maxScale); // 至少2倍分辨率

        // 计算高分辨率字体大小
        const highResFontSize = this.fontSize * highResScale;
        tempCtx.font = `${highResFontSize}px Arial`;

        // 测量文本尺寸
        const textMetrics = tempCtx.measureText(this.text);
        const textWidth = textMetrics.width;
        const textHeight = highResFontSize;

        // 设置canvas尺寸，留出边距
        const padding = (this.isUser ? 5 : 3) * highResScale;
        tempCanvas.width = textWidth + padding * 2;
        tempCanvas.height = textHeight + padding * 2;

        // 启用抗锯齿和高质量渲染
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        tempCtx.textRenderingOptimization = 'optimizeQuality';

        // 重新设置字体（canvas尺寸改变后需要重新设置）
        tempCtx.font = `${highResFontSize}px Arial`;
        tempCtx.textBaseline = 'top';

        // 为用户弹幕添加特殊效果
        if (this.isUser) {
            // 绘制背景和边框
            tempCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            // 绘制文字
            tempCtx.fillStyle = '#00f700';
        } else {
            tempCtx.fillStyle = this.color;
        }

        tempCtx.fillText(this.text, padding, padding);

        // 将canvas转换为图片
        this.textImage = new Image();
        this.textImage.src = tempCanvas.toDataURL('image/png');

        // 存储原始尺寸（用于缩放计算）
        this.imageWidth = tempCanvas.width / highResScale;
        this.imageHeight = tempCanvas.height / highResScale;
        this.highResScale = highResScale; // 保存高分辨率倍数
    }

    // 绘制
    draw() {
        if (!this.textImage || !this.textImage.complete) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;

        // 启用高质量图像缩放
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 计算缩放后的尺寸
        const scaledWidth = this.imageWidth * this.scale;
        const scaledHeight = this.imageHeight * this.scale;

        // 绘制图片，使用缩放
        ctx.drawImage(
            this.textImage,
            this.x - scaledWidth / 2,
            this.y - scaledHeight / 2,
            scaledWidth,
            scaledHeight
        );

        ctx.restore();
    }
}

// 生成随机颜色
function getRandomColor() {
    let a = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let c = Math.floor(Math.random() * 256);
    return `rgb(${a},${b},${c})`;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    danmakus = danmakus.filter(danmaku => {
        const isAlive = danmaku.update();
        if (isAlive) {
            danmaku.draw();
        }
        return isAlive;
    });

    requestAnimationFrame(animate);
}

animate();


// 增加弹幕
function addDanmaku(text, isUser = false) {
    if (text.trim() !== '') {
        while (danmakus.length >= MAX_DANMAKU_COUNT) {
            danmakus.shift();
        }
        danmakus.push(new Danmaku(text, isUser));
    }
}

// 清除所有弹幕
clearBtn.addEventListener('click', () => {
    danmakus = [];
});


// 发送弹幕
sendBtn.addEventListener('click', () => {
    const text = msgInput.value.trim();
    if (text) {
        addDanmaku(text, true); // 标记为用户弹幕
        msgInput.value = '';
    }
});

// 监听回车键发送弹幕
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = msgInput.value.trim();
        if (text) {
            addDanmaku(text, true); // 标记为用户弹幕
            msgInput.value = '';
        }
    }
});

let intervalId = setInterval(() => {
    for (let i = 0; i < 10; i++) {
        addDanmaku(`机器弹幕${i}`);
    }
}, 200);

// 切换页面暂停
document.addEventListener('visibilitychange', () => {
    clearInterval(intervalId);
    if (document.visibilityState === 'visible') {
        intervalId = setInterval(() => {
            for (let i = 0; i < 10; i++) {
                addDanmaku(`机器弹幕${i}`);
            }
        }, 200);
    } else {
        clearInterval(intervalId);
    }
});
