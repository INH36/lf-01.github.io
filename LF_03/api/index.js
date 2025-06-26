// 获取首页 热点数据
export const getHotNows = async () =>{
    return await fetch('https://m1.apifoxmock.com/m1/6660612-6368793-default/api/hotnows', { method: 'GET' })
}