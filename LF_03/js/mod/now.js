import { getHotNews } from '../../api/index.js';

// 获取容器
const newContainer = document.getElementById('new_img');

// 模板生成
const setHtml = (data) => {
    const tem = data.map((item,index)=>{
        return `
            <div id="new_img_${index+1}" class="flex w-full h-full overflow-hidden flex-col gap-9 items-center">
                    <div class="w-full h-[500px] overflow-hidden px-3 transition-all duration-500 hover:scale-[1.1]">
                        <img loading="lazy" class="h-full w-full object-cover" src="./${item.image}" alt="">
                    </div>
                    <div class="w-full text-white flex flex-col gap-7">
                        <span class="text-xl font-normal leading-[36px]">${item.title}</span>
                        <p class="text-sm font-light leading-7">
                            ${item.dosc}</p>
                    </div>
                </div>
        `
    }).join('')
    return tem
}

// 渲染
export const initNew = async () => {
    const res = await getHotNews()
    const newHtml = setHtml(res.data)
    newContainer.innerHTML = newHtml
}
