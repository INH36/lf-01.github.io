import { getHotNows } from '../../api/index.js';

// 获取容器
const nowContainer = document.getElementById('now_img');

// 模板生成
const setHtml = (data) => {
    const tem = data.map((item,index)=>{
        return `
            <div id="now_img_${index+1}" class="flex flex-col gap-9">
                    <div class="w-[348px] h-[506px] overflow-hidden transition-all duration-500 hover:scale-[1.1]">
                        <img loading="lazy" class="w-full h-full bg-cover" src="./${item.image}" alt="">
                    </div>

                    <div class="w-[348px] text-white flex flex-col gap-7">
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
export const initNow = async () => {
    const res = await getHotNows()
    const nowHtml = setHtml(res.data)
    nowContainer.innerHTML = nowHtml
}
