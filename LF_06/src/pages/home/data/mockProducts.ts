import type { Product } from '../hooks/useProductFilter';

/**
 * 模拟商品数据
 * 在实际项目中，这些数据应该从 API 获取
 */
export const mockProducts: Product[] = [
    { id: 1, name: '时尚T恤', price: 299, size: 'L', image: '/api/placeholder/200/200', tags: ['热销', '新品'] },
    { id: 2, name: '休闲牛仔裤', price: 599, size: 'M', image: '/api/placeholder/200/200', tags: ['经典'] },
    { id: 3, name: '运动鞋', price: 899, size: '43', image: '/api/placeholder/200/200', tags: ['运动', '舒适'] },
    { id: 4, name: '商务衬衫', price: 399, size: 'XL', image: '/api/placeholder/200/200', tags: ['商务', '正装'] },
    { id: 5, name: '连帽卫衣', price: 459, size: 'L', image: '/api/placeholder/200/200', tags: ['休闲', '保暖'] },
    { id: 6, name: '皮质手包', price: 1299, size: 'S', image: '/api/placeholder/200/200', tags: ['奢华', '皮质'] },
    { id: 7, name: '棒球帽', price: 159, size: 'XL', image: '/api/placeholder/200/200', tags: ['潮流', '防晒'] },
    { id: 8, name: '羊毛围巾', price: 299, size: 'M', image: '/api/placeholder/200/200', tags: ['保暖', '羊毛'] },
    { id: 9, name: '智能手表', price: 2999, size: '42', image: '/api/placeholder/200/200', tags: ['科技', '智能'] },
    { id: 10, name: '真皮钱包', price: 699, size: 'XS', image: '/api/placeholder/200/200', tags: ['真皮', '实用'] },
];

/**
 * 异步获取商品数据（模拟 API 调用）
 * @returns Promise<Product[]>
 */
export const fetchProducts = async (): Promise<Product[]> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts;
};

/**
 * 根据 ID 获取单个商品
 * @param id 商品 ID
 * @returns Product | undefined
 */
export const getProductById = (id: number): Product | undefined => {
    return mockProducts.find(product => product.id === id);
};

/**
 * 根据标签筛选商品
 * @param tag 标签
 * @returns Product[]
 */
export const getProductsByTag = (tag: string): Product[] => {
    return mockProducts.filter(product => product.tags.includes(tag));
};