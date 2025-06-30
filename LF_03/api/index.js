// 获取首页 热点数据
export const getHotNews = async () => {
    try {
        const response = await fetch('https://m1.apifoxmock.com/m1/6660612-6368793-default/api/hotnows', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取新闻数据失败:', error);
        return { data: [] }; // 返回空数组作为默认值
    }
}

// 获取新闻动态
export const getHotPageList = async (page = 1, pagesize = 8) => {
    try{
        const response = await fetch(`https://m1.apifoxmock.com/m1/6660612-6368793-default/api/now/nowlist?page=${page}&pagesize=${pagesize}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error('获取新闻数据失败:', error);
        return { data: [] }; // 返回空数组作为默认值
    }
}