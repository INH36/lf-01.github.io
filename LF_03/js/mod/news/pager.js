import { goToPage, getCurrentParams } from "./path.js"

const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const pageNumInput = document.getElementById('page_num')
const totalInfo = document.getElementById('total-info-container')


// 创建页码按钮
const createPageItem = (page, isActive = false) => {
    const li = document.createElement('span')
    li.className = 'cursor-pointer px-3 py-1 rounded-md border border-gray-300 hover:bg-active/60 transition-all cursor-pointer duration-200 text-sm mx-1'
    if (isActive) {
        li.classList.add('bg-[#ff350d]', 'text-white', 'border-[#ff350d]', 'font-medium')
    } else {
        li.classList.add('text-gray-700')
    }
    li.textContent = page
    
    // 添加点击事件监听
    li.addEventListener('click', () => {
        if (!isActive && typeof page === 'number') {
            const { pagesize } = getCurrentParams()
            goToPage(page, pagesize)
        }
    })
    
    return li
}

// 创建省略号
const createEllipsis = () => {
    const li = document.createElement('span')
    li.className = 'px-2 py-1 text-gray-500 text-sm mx-1'
    li.textContent = '...'
    return li
}

// 渲染分页器
const renderPager = (currentPage, pageSize, total) => {
    // 清空分页器
    totalInfo.innerHTML = ''

    // 显示页码逻辑
    const showPages = []

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            showPages.push(i)
        }
    } else {
        if (currentPage <= 4) {
            showPages.push(1, 2, 3, 4, 5, '...', total)
        } else if (currentPage >= total - 3) {
            showPages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
        } else {
            showPages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', total)
        }
    }

    // 渲染页码
    showPages.forEach(page => {
        if (page === '...') {
            totalInfo.appendChild(createEllipsis())
        } else {
            totalInfo.appendChild(createPageItem(page, page === currentPage))
        }
    })

    // 更新上一页下一页按钮状态
    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                goToPage(currentPage - 1, pageSize)
            }
        }
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage >= total
        nextBtn.onclick = () => {
            if (currentPage < total) {
                goToPage(currentPage + 1, pageSize)
            }
        }
    }
}

// 初始化分页器
export const init = async (links) => {
    const { currentPage = 1, pageSize = 8, total = 0 } = links
    renderPager(currentPage, pageSize, total)
    
    // 添加页码输入框的事件监听
    if (pageNumInput) {
        pageNumInput.max = total
        pageNumInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                jumpToPage()
            }
        })
    }
    
    // 添加每页显示数量选择框的事件监听
    const pageSizeSelect = document.querySelector('select')
    if (pageSizeSelect) {
        // 设置当前选中的选项
        const options = pageSizeSelect.options
        for (let i = 0; i < options.length; i++) {
            if (parseInt(options[i].value) === pageSize) {
                pageSizeSelect.selectedIndex = i
                break
            }
        }
        
        // 添加change事件监听
        pageSizeSelect.addEventListener('change', () => {
            const newPageSize = parseInt(pageSizeSelect.value)
            goToPage(1, newPageSize) // 切换每页显示数量时，回到第一页
        })
    }
}

// 跳转到指定页面
const jumpToPage = () => {
    const { pagesize } = getCurrentParams()
    const targetPage = parseInt(pageNumInput.value)
    const maxPage = parseInt(pageNumInput.max)

    if (targetPage >= 1 && targetPage <= maxPage) {
        goToPage(targetPage, pagesize)
    } else {
        alert(`请输入1-${maxPage}之间的页码`)
        // 恢复输入框的值为当前页码
        const params = getCurrentParams()
        pageNumInput.value = params.page || 1
    }
}
