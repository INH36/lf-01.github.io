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
    constructor(text) {
        this.text = text;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * Math.random();
        this.angle = (Math.random() * 240 - 30) * Math.PI / 180;
        this.speed = 1 + Math.random() * 4;
        this.fontSize = 12 + Math.floor(Math.random() * 7);
        this.maxFontSize = Math.min(36, this.fontSize * 2);
        this.color = getRandomColor();
        this.alpha = 1;
        this.life = 0;
        this.maxLife = 200;
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
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// 生成随机颜色
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
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
function addDanmaku(text) {
    if (text.trim() !== '') {
        danmakus.push(new Danmaku(text));
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
        addDanmaku(text);
        msgInput.value = '';
    }
});

// 监听回车键发送弹幕
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = msgInput.value.trim();
        if (text) {
            addDanmaku(text);
            msgInput.value = '';
        }
    }
});


// 没0.2s向弹幕池中增加10条弹幕
let intervalId = setInterval(() => {
    for (let i = 0; i < 10; i++) {
        addDanmaku(`机器弹幕${i}`);
    }
}, 200);

