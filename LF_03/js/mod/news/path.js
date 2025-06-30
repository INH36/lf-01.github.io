import { getHotPageList } from '../../../api/index.js'
import { init as imageInit } from './image.js'
import { init as pagerInit } from './pager.js'

// 加载页面数据，不刷新整个页面
export const loadPageData = async () => {
    // 不刷新整个页面，而是重新获取数据并更新内容
    const { data, links } = await getNewList()
    await imageInit(data)
    await pagerInit(links)
}

// 获取当前URL参数
export const getCurrentParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
        page: parseInt(params.get('page')) || 1,
        pagesize: parseInt(params.get('pagesize')) || 8
    }
}

// 更新URL参数
export const updateURL = (page, pagesize) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    url.searchParams.set('pagesize', pagesize)
    window.history.pushState({}, '', url)
}

// 跳转到指定页面
export const goToPage = (page, pagesize) => {
    updateURL(page, pagesize)
    loadPageData()
}

// 获取新闻列表数据
const getNewList = async () => {
    const { page, pagesize } = getCurrentParams()
    const { data, links } = await getHotPageList(page, pagesize)
    return { data, links }
}