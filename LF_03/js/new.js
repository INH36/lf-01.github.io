import { init as imageInit } from './mod/news/image.js'
import { init as pagerInit } from './mod/news/pager.js'
import { getCurrentParams, loadPageData } from './mod/news/path.js'

document.addEventListener('DOMContentLoaded', async () => {
    // 监听浏览器前进后退按钮事件
    window.addEventListener('popstate', async () => {
        // 当URL变化时，重新加载页面数据但不刷新整个页面
        await loadPageData()
    })
    
    // 初始化页面
    await loadPageData()
})
