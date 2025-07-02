// 缓存功能测试
import { addLangCache, getLangCache, clearLangCache, getAllCache } from './index';
import { GitHubRepoItem } from '../type';

// 模拟测试数据
const mockData: GitHubRepoItem[] = [
    {
        id: 1,
        name: 'test-repo-1',
        full_name: 'user/test-repo-1',
        description: 'Test repository 1',
        stargazers_count: 100,
        language: 'JavaScript',
        html_url: 'https://github.com/user/test-repo-1',
        owner: {
            login: 'user',
            avatar_url: 'https://github.com/user.png'
        }
    } as GitHubRepoItem,
    {
        id: 2,
        name: 'test-repo-2',
        full_name: 'user/test-repo-2',
        description: 'Test repository 2',
        stargazers_count: 200,
        language: 'TypeScript',
        html_url: 'https://github.com/user/test-repo-2',
        owner: {
            login: 'user',
            avatar_url: 'https://github.com/user.png'
        }
    } as GitHubRepoItem
];

// 测试缓存功能
export const testCache = () => {
    console.log('开始测试缓存功能...');
    
    // 测试添加缓存
    addLangCache('JavaScript', mockData, 1);
    console.log('✓ 添加缓存成功');
    
    // 测试获取缓存
    const cachedData = getLangCache('JavaScript', 1);
    if (cachedData && cachedData.length === 2) {
        console.log('✓ 获取缓存成功');
    } else {
        console.log('✗ 获取缓存失败');
    }
    
    // 测试获取不存在的缓存
    const nonExistentCache = getLangCache('Python', 1);
    if (nonExistentCache === null) {
        console.log('✓ 正确处理不存在的缓存');
    } else {
        console.log('✗ 未正确处理不存在的缓存');
    }
    
    // 测试查看所有缓存
    const allCache = getAllCache();
    console.log('所有缓存:', allCache);
    
    // 测试清除缓存
    clearLangCache('JavaScript');
    const clearedCache = getLangCache('JavaScript', 1);
    if (clearedCache === null) {
        console.log('✓ 清除缓存成功');
    } else {
        console.log('✗ 清除缓存失败');
    }
    
    console.log('缓存功能测试完成!');
};