import { http } from "./http.js";

// 获取首页 热点数据
export const getHotNews = async () => {
    const res = await http.get('/hotnows')
    return res.data;
}

// 获取新闻动态
export const getHotPageList = async (page = 1, pagesize = 8) => {
    const params = {
        page,
        pagesize
    }
    const res = await http.get('/now/nowlist', params)
    return res
}

// 获取新闻详情
export const getNewDetails = async (id = 1) => {
    const params = {
        id
    }
    const res = await http.get('/now/details', params)
    return res
}
