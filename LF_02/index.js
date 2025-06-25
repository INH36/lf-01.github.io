// 获取DOM元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('.btn-clear');
const msgInput = document.querySelector('.msg-input');
const sendBtn = document.querySelector('.send');

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
        this.color = isUser ? '#FFD700' : getRandomColor(); // 用户弹幕使用金色
        this.alpha = 1;
        this.life = 0;
        this.maxLife = 200;
        this.isUser = isUser; // 标记是否为用户发送的弹幕
    }

    // 更新位置
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        if (this.life < this.maxLife / 2) {
            this.fontSize = this.fontSize + (this.maxFontSize - this.fontSize) * 0.03;
        } else {
            this.alpha = 1 - (this.life - this.maxLife / 2) / (this.maxLife / 2);
        }
        return this.life < this.maxLife &&
            this.x > -100 && this.x < canvas.width + 100 &&
            this.y > -100 && this.y < canvas.height + 100;
    }

    // 绘制
    draw() {
        ctx.save();
        ctx.font = `${Math.floor(this.fontSize)}px Arial`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;

        // 为用户弹幕添加特殊效果
        if (this.isUser) {
            // 计算文本宽度和高度
            const textWidth = ctx.measureText(this.text).width;
            const textHeight = this.fontSize;

            // 绘制长方形边框
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - 5, this.y - textHeight + 5, textWidth + 10, textHeight + 5);
            ctx.fillStyle = '#00f700';
            // 绘制文本
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillText(this.text, this.x, this.y);
        }
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

// 弹幕数组
let danmakus = [];

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
