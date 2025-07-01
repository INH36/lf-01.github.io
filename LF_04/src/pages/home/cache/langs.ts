// 切换语言列表的缓存

import { GitHubSearchResponse } from "../type";

interface CacheItem {
    data: GitHubSearchResponse[]
    timestamp: number
    expireTime: number // 缓存过期时间（毫秒）
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
        // 缓存过期，删除并返回null
        langCacheList.delete(lang)
        return null
    }
    
    return cacheItem.data
}

// 清除指定语言的缓存
export const clearLangCache = (lang: string) => {
    langCacheList.delete(lang)
}

// 清除所有缓存
export const clearAllCache = () => {
    langCacheList.clear()
}

// 获取缓存统计信息
export const getCacheStats = () => {
    const stats = {
        totalCached: langCacheList.size,
        languages: Array.from(langCacheList.keys()),
        cacheDetails: Array.from(langCacheList.entries()).map(([lang, item]) => ({
            language: lang,
            cachedAt: new Date(item.timestamp).toLocaleString(),
            expiresIn: Math.max(0, item.expireTime - (Date.now() - item.timestamp)),
            itemCount: item.data[0]?.items?.length || 0
        }))
    }
    return stats
}