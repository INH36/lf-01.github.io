import React, { useState, useEffect } from 'react';
import LanguageNav from './components/language-nav';
import RepoList from './components/repo-list';
import { gitHotRepositories } from './server';
import { GitHubRepoItem, GitHubSearchResponse, repositories } from './type';
import './styles/index.scss'
import { addLangCache, getAllCache, getLangCache } from './cache';

const lans = ['ALL', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

const Popular: React.FC = () => {
    const [language, setLanguage] = useState<string>('ALL')
    const [items, setItems] = useState<GitHubRepoItem[] | []>([]) // 仓库列表
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)

    const fetchRepositories = async (currentPage: number = 1, targetLanguage?: string) => {
        if (currentPage > 1) {
            setLoadingMore(true)
        }
        
        // 使用传入的语言参数或当前state中的语言
        const currentLanguage = targetLanguage || language

        console.log(getAllCache());
        
        // 是否命中缓存
        const cache = getLangCache(currentLanguage, currentPage)
        if (cache && cache.length > 0) {
            console.log('使用缓存数据:', cache);
            // 使用缓存数据
            if (currentPage === 1) {
                setItems(cache)
            } else {
                setItems(prevItems => [...prevItems, ...cache])
            }
            setPage(currentPage)
            setLoading(false)
            setLoadingMore(false)
            return
        }

        const params: repositories = {
            q: 'stars:>1',
            per_page: 10,
            language: currentLanguage,
            sort: 'stars',
            page: currentPage,
            type: 'Repositories',
            order: 'desc'
        }

        try {
            const res: GitHubSearchResponse = await gitHotRepositories(params)
            if (res.items.length === 0) {
                setHasMore(false)
            } else {
                // 缓存当前页数据
                addLangCache(currentLanguage, res.items, currentPage)
                
                if (currentPage === 1) {
                    setItems(res.items)
                } else {
                    setItems(prevItems => [...prevItems, ...res.items])
                }
                setPage(currentPage)
            }
        } catch (error) {
            console.error('获取数据失败:', error)
            setHasMore(false)
        }
        
        setLoading(false)
        setLoadingMore(false)
    }



    useEffect(() => {
        fetchRepositories()
    }, [language])

    useEffect(() => {
        const url = new URL(window.location.href)
        const language = url.searchParams.get('language')
        setLanguage(language as string || 'ALL')
    }, [])

    const selectLang = (newLanguage: typeof lans[number]) => {
        const url = new URL(window.location.href)
        url.searchParams.set('language', newLanguage)
        window.history.replaceState(null, '', url.toString())
        setPage(1)
        setItems([])
        setHasMore(true)
        setLoading(true)
        setLanguage(newLanguage)
        fetchRepositories(1, newLanguage)
    }

    const loadMore = (page: number) => {
        fetchRepositories(page)
    }

    return (
        <div className='home'>
            <LanguageNav languages={lans} currentLanguage={language} onSelectLanguage={selectLang} />
            <RepoList
                items={items}
                loading={loading}
                loadingMore={loadingMore}
                hasMore={hasMore}
                onLoadMore={loadMore}
                page={page}
            />
        </div>
    )
}


export default Popular;
