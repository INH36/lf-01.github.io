// 获取模板
const getNewPageItemTem = (data) => {
    const tem = data.map((item, index)=>{
        return `
            <div class="w-80 flex flex-col gap-8 cursor-pointer" data-index="${index}">
                <div class="w-full h-[500px] relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.05] image-container lazy-load-placeholder" data-thumbnail="./img${item.thumbnail}" data-image="./img${item.image}">
                    <img class="w-full h-full bg-slate-200 object-cover thumbnail-img" src="./img${item.thumbnail}" alt="" />
                </div>
                <div class="flex flex-col gap-4 transition-colors duration-200 hover:text-[#ff350d]">
                    <p class="text-xl font-normal truncate">${item.title}</p>
                    <p class="text-sm line-clamp-2">${item.dosc}</p>
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
        const mainImg = new Image();
        mainImg.className = 'w-full h-full object-cover main-img';
        mainImg.alt = '';
        mainImg.onload = () => {
            container.appendChild(mainImg);
            setTimeout(() => {
                container.classList.add('loaded');
            }, 500);
        };
        mainImg.onerror = () => {
            console.warn('原图加载失败，保持显示缩略图:', imagePath);
            container.classList.add('loaded');
        };    
        setTimeout(() => {
            mainImg.src = imagePath;
        }, 200);
    });
}

const addClickEvent = (data) => {
    const newsItems = document.querySelectorAll('.cursor-pointer[data-index]');
    newsItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.dataset.index;
            const id = data[index].id || index;
            window.location.href = `./details.html?id=${id}`;
        });
    });
}

export const init = async(data = []) => {
    const imgCom = document.getElementById('new_info')
    imgCom.innerHTML = getNewPageItemTem(data)
    lazyLoadImages()
    addClickEvent(data) 
}
