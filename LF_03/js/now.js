import { getHotPageList } from "../api/index.js"


// 获取模板
const getNowPageItemTem = (data) => {
    const tem = data.map((item, index)=>{
        return `
            <div class="w-80 flex flex-col gap-8 cursor-pointer" data-index="${index}">
                <div class="w-full h-[500px] relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.05] image-container lazy-load-placeholder" data-thumbnail="./img${item.thumbnail}" data-image="./img${item.image}">
                    <img class="w-full h-full object-cover thumbnail-img" src="./img${item.thumbnail}" alt="" />
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-xl font-normal truncate">${item.title}</p>
                    <p class="text-sm text-gray-600 line-clamp-2">${item.dosc}</p>
                </div>
            </div>
        `
    }).join('')
    return tem
}

// 图片加载函数
const lazyLoadImages = () => {
    const imageContainers = document.querySelectorAll('.lazy-load-placeholder');
    
    imageContainers.forEach(container => {
        const imagePath = container.dataset.image;
        // 创建原图元素
        const mainImg = new Image();
        mainImg.className = 'w-full h-full object-cover main-img';
        mainImg.alt = '';
        
        // 原图加载完成后的处理
        mainImg.onload = () => {
            // 添加原图到容器
            container.appendChild(mainImg);
            
            // 延迟一点时间让用户看到加载过程
            setTimeout(() => {
                mainImg.classList.add('loaded');
                container.classList.add('loaded');
            }, 500);
        };
        
        // 原图加载失败的处理
        mainImg.onerror = () => {
            console.warn('原图加载失败，保持显示缩略图:', imagePath);
            container.classList.add('loaded');
        };
        
        setTimeout(() => {
            mainImg.src = imagePath;
        }, 200);
    });
}

const init = async() => {
    const {data} = await getHotPageList()
    const imgCom = document.getElementById('now_info')
    imgCom.innerHTML = getNowPageItemTem(data)
    lazyLoadImages()
}

document.addEventListener('DOMContentLoaded', init)
