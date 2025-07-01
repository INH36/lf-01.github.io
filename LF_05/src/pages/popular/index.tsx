import React, { useState, useEffect, useRef, useCallback } from 'react';
import HotItem from './components/hot-item';
import SkeletonItem from './components/skeleton-item';
import { gitHotRepositories } from './server';
import { GitHubRepoItem, GitHubSearchResponse, repositories } from './type';


const lans = ['ALL', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

const Popular: React.FC = () => {
    const [language, setLanguage] = useState<string>('ALL')

    const [items, setItems] = useState<GitHubRepoItem[] | []>([]) // 仓库列表
    const [loading, setLoading] = useState<boolean>(true) // 初始加载状态
    const [loadingMore, setLoadingMore] = useState<boolean>(false) // 加载更多状态
    const [hasMore, setHasMore] = useState<boolean>(true) // 是否还有更多数据
    const [page, setPage] = useState<number>(1) // 当前页码
    const hotRef = useRef<HTMLDivElement | undefined>(null)

    // 获取表单数据
    const fetchRepositories = async (currentPage: number = 1) => {
        if (currentPage > 1) {
            setLoadingMore(true);
        }
        // 读取URL language
        const url = new URL(window.location.href)
        const language = url.searchParams.get('language')

        const params: repositories = {
            q: 'stars:>1',
            per_page: 10,
            language: language ? language : 'ALL',
            sort: 'stars',
            page: currentPage,
            type: 'Repositories',
            order: 'desc',
        }

        const res: GitHubSearchResponse = await gitHotRepositories(params)
        if (res.items.length === 0) {
            setHasMore(false);
        } else {
            if (items.length) {
                setItems(prevItems => [...prevItems, ...res.items])
            } else {
                setItems(res.items)
            }
            setPage(currentPage);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    useEffect(() => {
        fetchRepositories()
    }, [language])

    useEffect(() => {
        // 监听滚动事件
        const currentRef = hotRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        // 清理函数
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, loadingMore, hasMore, page])

    // 选择 语言
    const selectLang = (language: typeof lans[number]) => {
        // 映射到url上
        const url = new URL(window.location.href)
        url.searchParams.set('language', language)
        window.history.replaceState(null, '', url.toString())
        setItems([])
        setLanguage(language)
        fetchRepositories()
    }

    // 监听滚动事件
    const handleScroll = useCallback(() => {
        if (!hotRef.current || loading || loadingMore || !hasMore) {
            return;
        }

        const { scrollTop, clientHeight, scrollHeight } = hotRef.current;
        // 当滚动到距离底部10px时加载更多
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            fetchRepositories(page + 1);
        }
    }, [loading, loadingMore, hasMore, page])

    return (
        <div className='w-screen h-screen overflow-hidden flex flex-col gap-4 justify-center items-center'>
            <div className='flex justify-center items-center w-full gap-4 h-[30px]'>
                {
                    lans.map((item, index) => (
                        <span
                            key={index}
                            onClick={() => selectLang(item)}
                            className={`font-semibold text-sm cursor-pointer duration-200 transition-all hover:text-[#bc574b] ${language === item ? 'text-[#bc574b]' : ''}`}

                        >
                            {item}
                        </span>
                    ))
                }
            </div>
            <div ref={hotRef as React.RefObject<HTMLDivElement>} className='w-4/5 h-full flex py-4 flex-wrap justify-around gap-4 overflow-auto'>
                {
                    loading ? (
                        Array(10).fill(0).map((_, index) => (
                            <div key={index} className='lg:w-[calc(25%-1rem)] md:w-[calc(33.333%-1rem)] sm:w-[calc(50%-1rem)] w-[calc(50%-1rem)]'>
                                <SkeletonItem />
                            </div>
                        ))
                    ) : (
                        <>
                            {items.map((item, index) => (
                                <div key={index} className='lg:w-[calc(25%-1rem)] md:w-[calc(33.333%-1rem)] sm:w-[calc(50%-1rem)] w-[calc(50%-1rem)]'>
                                    <HotItem {...item} index={index} />
                                </div>
                            ))}
                            {loadingMore && (
                                Array(4).fill(0).map((_, index) => (
                                    <div key={`loading-more-${index}`} className='lg:w-[calc(25%-1rem)] md:w-[calc(33.333%-1rem)] sm:w-[calc(50%-1rem)] w-[calc(50%-1rem)]'>
                                        <SkeletonItem />
                                    </div>
                                ))
                            )}
                            {!hasMore && items.length > 0 && (
                                <div className='w-full flex justify-center items-center py-4'>
                                    <span className='text-gray-500'>没有更多数据了</span>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Popular;
