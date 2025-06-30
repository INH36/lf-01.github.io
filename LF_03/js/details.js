import { getNewDetails } from "../api/index.js"

const detailsContent = document.getElementById('details_content')
// 获取URL参数 
const getUrlParams = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    const res = await getNewDetails(id)
    return res.data
}

// 文字处理 `/n`
const textHandle = (text) => {
    const paragraphs = text.split('\n')
    const filteredParagraphs = paragraphs
        .map(p => p.trim())
        .filter(p => p.length > 0);
    const htmlParagraphs = filteredParagraphs
        .map(p => `<p>\n    ${p}\n</p>`);
    return htmlParagraphs.join('');
}

// 获取模板
const htmlTem = ({img, title,theme ,dosc, reporter, from}) => {
    return `
        <div class="w-full flex flex-col gap-12">
                ${img ? `<img loading="lazy" class="w-full aspect-[29/11] object-cover" src="./img${img}"
                    srcset="./img${img} 1x,./img/${img} 2x" alt="">` : ''}
                <div class="w-full flex flex-col justify-center items-center gap-7">
                    ${title ? `<h1 class="text-4xl">${title}</h1>` : ''}
                    ${from ? `<h5 class="text-xl text-[#b1b1b1]">${from}</h5>` : ''}
                </div>
                <div class="w-full">
                    <h3 class="text-base font-semibold">${theme}</h3>
                    <div class="font-normal leading-7 mt-5 indent-8">
                        ${textHandle(dosc)}
                    </div>
                    <p class="mt-5">${reporter}</p>
                </div>
            </div>
    `
}

// 初始化
const init = async () => {
    const data = await getUrlParams()
    if (!data.length) return
    const html = data.map(item=>htmlTem(item)).join('')
    detailsContent.innerHTML = html
}


document.addEventListener('DOMContentLoaded', async () => {
    await init()
})
