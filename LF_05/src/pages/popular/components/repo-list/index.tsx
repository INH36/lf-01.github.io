import React, { useRef, useCallback, useEffect } from 'react';
import HotItem from '../hot-item';
import SkeletonItem from '../skeleton-item';
import { GitHubRepoItem } from '../../type';
import './index.scss';

interface RepoListProps {
  items: GitHubRepoItem[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  onLoadMore: (page: number) => void;
  page: number;
}

const RepoList: React.FC<RepoListProps> = ({
  items,
  loading,
  loadingMore,
  hasMore,
  onLoadMore,
  page
}) => {
  const hotRef = useRef<HTMLDivElement | undefined>(null);

  // 监听滚动事件
  const handleScroll = useCallback(() => {
    if (!hotRef.current || loading || loadingMore || !hasMore) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = hotRef.current;
    // 当滚动到距离底部10px时加载更多
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      onLoadMore(page + 1);
    }
  }, [loading, loadingMore, hasMore, page, onLoadMore]);

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
  }, [handleScroll]);

  return (
    <div ref={hotRef as React.RefObject<HTMLDivElement>} className='repo-list'>
      {
        loading ? (
          Array(10).fill(0).map((_, index) => (
            <div key={index} className='repo-list__item'>
              <SkeletonItem />
            </div>
          ))
        ) : (
          <>
            {items.map((item, index) => (
              <div key={index} className='repo-list__item'>
                <HotItem {...item} index={index} />
              </div>
            ))}
            {loadingMore && (
              Array(4).fill(0).map((_, index) => (
                <div key={`loading-more-${index}`} className='repo-list__item'>
                  <SkeletonItem />
                </div>
              ))
            )}
            {!hasMore && items.length > 0 && (
              <div className='repo-list__no-more'>
                <span className='no-more-text'>没有更多数据了</span>
              </div>
            )}
          </>
        )
      }
    </div>
  );
};

export default RepoList;