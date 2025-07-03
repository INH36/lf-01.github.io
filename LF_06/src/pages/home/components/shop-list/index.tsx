import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Empty, Space, Tag, Modal, InputNumber, Radio, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Product } from '../../type';
import { getProducts } from '../../server';
import { addToCart } from '@/store/silce/shopSlice';

interface ShopListProps {
    products: Product[];
    total: number;
}

const ShopList: React.FC<ShopListProps> = () => {
    const shop = useSelector((state: RootState) => state.shop);
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();


    const [products, setProducts] = useState<Product[]>([]) // 原始数据
    const [showProducts, setShowProducts] = useState<Product[]>([]) // 展示数据
    const [total, setTotal] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // 请求
    const loadProducts = async () => {
        const response = await getProducts();
        const newProducts = response.data.list;
        setProducts(newProducts);
        setShowProducts(newProducts);
        setTotal(response.data.total);
    };

    // 筛选
    const shopFilter = () => {
        let filteredProducts = [...products];
        
        // 尺寸筛选
        if (shop.selectSize.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                product.size.some(size => shop.selectSize.includes(size))
            );
        }
        
        // 价格范围筛选
        filteredProducts = filteredProducts.filter(product => 
            product.price >= shop.priceRange[0] && product.price <= shop.priceRange[1]
        );
        
        // 价格排序
        filteredProducts.sort((a, b) => {
            if (shop.sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        
        setShowProducts(filteredProducts);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    // 监听筛选条件变化
    useEffect(() => {
        if (products.length > 0) {
            shopFilter();
        }
    }, [shop.selectSize, shop.priceRange, shop.sortOrder, products]);

    // 展示商品详情
    const showAddToCartModal = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSize('');
        setQuantity(1);
        setIsModalVisible(true);
    };

    // 添加购物车
    const handleAddToCart = () => {
        if (!selectedProduct) return;

        if (!selectedSize) {
            messageApi.error('请选择商品尺寸');
            return;
        }

        dispatch(addToCart({
            product: selectedProduct,
            quantity: quantity,
            selectedSize: selectedSize
        }));

        message.success('商品已添加到购物车');
        setIsModalVisible(false);
        setSelectedProduct(null);
        setSelectedSize('');
        setQuantity(1);
    };


    // 关闭
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
        setSelectedSize('');
        setQuantity(1);
    };


    return (
        <div className='w-full h-full flex flex-col relative' >
            {contextHolder}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">商品列表</h2>
                <p className="text-gray-600 mt-2">
                    共找到 {showProducts.length} 件商品
                    {total > 0 && showProducts.length !== total && (
                        <span className="text-gray-500"> (共 {total} 件商品)</span>
                    )}
                    {shop && (
                        <span className="ml-2">
                            (按价格{shop.sortOrder === 'asc' ? '升序' : '降序'}排列)
                        </span>
                    )}
                </p>
            </div>

            <div ref={containerRef} className='w-full overflow-auto px-2 py-2 flex-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {showProducts.map((product, index) => (
                    <div key={index} className="w-full">
                        <Card
                            hoverable
                            cover={
                                <div className="h-48 overflow-hidden w-full bg-gray-200 !flex items-center justify-center">
                                    <img loading='lazy' className='w-full h-full object-cover' src={product.image} alt="" />
                                </div>
                            }
                        >
                            <Card.Meta
                                title={product.name + '' + index}
                                description={
                                    <Space direction="vertical" className="w-full">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-red-500">
                                                ¥{product.price}
                                            </span>
                                            <span className="text-sm text-gray-500 flex flex-col gap-1">
                                                <span className="rounded-full">
                                                    尺寸：
                                                </span>
                                                <div>
                                                    {
                                                        product.size.map(size => (
                                                            <Tag key={size} color="blue" className="rounded-full">
                                                                {size}
                                                            </Tag>
                                                        ))
                                                    }
                                                </div>

                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                {product.tags.map(tag => (
                                                    <Tag key={tag} color="blue" className="mb-1">
                                                        {tag}
                                                    </Tag>
                                                ))}
                                            </div>

                                            <i onClick={() => showAddToCartModal(product)} className='bg-blue-500 text-white px-2 hover:bg-blue-300 transition-all da200 py-1 rounded-full cursor-pointer'>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </i>
                                        </div>
                                    </Space>
                                }
                            />
                        </Card>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="w-full h-full flex justify-center px-12 py-14 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Empty description="加载中。。。" />
                </div>
            )}
            
            {products.length > 0 && showProducts.length === 0 && (
                <div className="w-full h-full flex justify-center px-12 py-14 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Empty description="没有符合条件的商品" />
                </div>
            )}

            <Modal
                title="添加到购物车"
                open={isModalVisible}
                onOk={handleAddToCart}
                onCancel={handleCancel}
                okText="添加到购物车"
                cancelText="取消"
                width={500}
            >
                {selectedProduct && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                                <p className="text-xl text-red-500 font-bold">¥{selectedProduct.price}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                选择尺寸 <span className="text-red-500">*</span>
                            </label>
                            <Radio.Group
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full"
                            >
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedProduct.size.map(size => (
                                        <Radio.Button
                                            key={size}
                                            value={size}
                                            className="text-center"
                                        >
                                            {size}
                                        </Radio.Button>
                                    ))}
                                </div>
                            </Radio.Group>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                选择数量
                            </label>
                            <InputNumber
                                min={1}
                                max={99}
                                value={quantity}
                                onChange={(value) => setQuantity(value || 1)}
                                className="flex-1"
                            />
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">小计：</span>
                                <span className="text-lg font-bold text-red-500">
                                    ¥{(selectedProduct.price * quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ShopList;