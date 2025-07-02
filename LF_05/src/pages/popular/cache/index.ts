// 切换语言列表的缓存

import { GitHubRepoItem } from "../type";

interface CacheItem {
    data: GitHubRepoItem[]
    timestamp: number  // 缓存时间
    expireTime: number // 缓存过期时间（毫秒）
}

// 使用语言+页码作为key来缓存每页数据
const langCacheList = new Map<string, CacheItem>()

const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 默认缓存5分钟

// 添加缓存 - 按页缓存
export const addLangCache = (lang: string, data: GitHubRepoItem[], page: number = 1, expireTime: number = DEFAULT_CACHE_TIME) => {
    const cacheKey = `${lang}_page_${page}`
    const cacheItem: CacheItem = {
        data,
        timestamp: Date.now(),
        expireTime
    }
    langCacheList.set(cacheKey, cacheItem)
}

// 获取缓存 - 按页获取
export const getLangCache = (lang: string, page: number) => {
    const cacheKey = `${lang}_page_${page}`
    const cacheItem = langCacheList.get(cacheKey)
    if (!cacheItem) {
        return null
    }
    
    // 检查缓存是否过期
    const now = Date.now()
    if (now - cacheItem.timestamp > cacheItem.expireTime) {
        // 缓存过期，删除并返回null
        langCacheList.delete(cacheKey)
        return null
    }
    return cacheItem.data
}

// 清除指定语言的所有缓存
export const clearLangCache = (lang: string) => {
    const keysToDelete: string[] = []
    langCacheList.forEach((_, key) => {
        if (key.startsWith(`${lang}_page_`)) {
            keysToDelete.push(key)
        }
    })
    keysToDelete.forEach(key => langCacheList.delete(key))
}

// 清除所有缓存
export const clearAllCache = () => {
    langCacheList.clear()
}

// 查看全部缓存数据
export const getAllCache = () => {
    const allCache: Record<string, CacheItem> = {}
    langCacheList.forEach((value, key) => {
        allCache[key] = value
    })
    return allCache
}