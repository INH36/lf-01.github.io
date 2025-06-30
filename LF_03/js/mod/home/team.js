const info = [
    {
        name: 'Jon Smith',
        title: '特级教师，从事教育工作10年',
        image: '/img/team/t_1.jpg'
    },
    {
        name: 'Merri Bond',
        title: '特级教师，从事教育工作10年',
        image: '/img/team/t_2.jpg'
    },
    {
        name: 'Samuel Fredman',
        title: '特级教师，从事教育工作10年',
        image: '/img/team/t_3.jpg'
    },
]

// 模板生成
const setHtml = () => {
    const tem = info.map((item,index)=>{
        return `
            <div id="team_img_${index+1}" class="relative overflow-hidden flex justify-center transition-all duration-500 hover:scale-[1.1]">
                <img loading="lazy" class="w-full h-full bg-cover "
                    src="./${item.image}" alt="">
                <div class="absolute flex flex-col text-white bottom-[100px] justify-center items-center">
                    <span class="text-5xl">${item.name}</span>
                    <span class="mt-7 text-xl">${item.title}</span>
                    <div class="mt-[54px] flex gap-4">
                        <i class="w-6 h-6">
                            <img loading="lazy" class="w-full h-full bg-cover" src="./img/common/r_arrow.png"
                                alt="">
                        </i>
                        <span class="text-xl hover:text-[#FF6600] transition-colors duration-200 cursor-pointer">More information</span>
                    </div>
                </div>
            </div>
        `
    }).join('')
    return tem
}

export const initTeam = () => {

    const teamContainer = document.getElementById('team_img')
    const teamHtml = setHtml()
    teamContainer.innerHTML = teamHtml
}