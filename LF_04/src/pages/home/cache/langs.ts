import { GitHubSearchResponse } from "../type";

interface CacheItem {
    data: GitHubSearchResponse[]
    timestamp: number
    expireTime: number
}

const langCacheList = new Map<string, CacheItem>()
const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 默认缓存5分钟

// 添加缓存
export const addLangCache = (lang: string, data: GitHubSearchResponse[], expireTime: number = DEFAULT_CACHE_TIME) => {
    const cacheItem: CacheItem = {
        data,
        timestamp: Date.now(),
        expireTime
    }
    langCacheList.set(lang, cacheItem)
}

// 获取缓存
export const getLangCache = (lang: string) => {
    const cacheItem = langCacheList.get(lang)
    
    if (!cacheItem) {
        return null
    }
    
    // 检查缓存是否过期
    const now = Date.now()
    if (now - cacheItem.timestamp > cacheItem.expireTime) {
        langCacheList.delete(lang)
        return null
    }
    
    return cacheItem.data
}


// 获取缓存统计信息
export const getCacheStats = () => {
    return langCacheList
}