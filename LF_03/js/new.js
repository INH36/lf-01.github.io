import {  loadPageData } from './mod/news/path.js'

document.addEventListener('DOMContentLoaded', async () => {
    window.addEventListener('popstate', async () => {
        await loadPageData()
    })
    await loadPageData()
})
