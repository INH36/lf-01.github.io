import { Card, Space, Tag } from 'antd';
import React from 'react';

const ShopList: React.FC = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">商品列表</h2>
                <p className="text-gray-600 mt-2">
                    共找到 {filteredProducts.length} 件商品
                    {filteredProducts.sortOrder && (
                        <span className="ml-2">
                            (按价格{filteredProducts.sortOrder === 'asc' ? '升序' : '降序'}排列)
                        </span>
                    )}
                </p>
            </div>

            <div className='w-full overflow-auto flex-1 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                {filteredProducts.map(product => (
                    <div key={product.id} className="w-full">
                        <Card
                            hoverable
                            cover={
                                <div className="h-48 w-full bg-gray-200 !flex items-center justify-center">
                                    <span className="text-gray-500 text-center">商品图片</span>
                                </div>
                            }

                        >
                            <Card.Meta
                                title={product.name}
                                description={
                                    <Space direction="vertical" className="w-full">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-red-500">
                                                ¥{product.price}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                尺寸: {product.size}
                                            </span>
                                        </div>
                                        <div>
                                            {product.tags.map(tag => (
                                                <Tag key={tag} color="blue" className="mb-1">
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>
                                    </Space>
                                }
                            />
                        </Card>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg">没有找到符合条件的商品</div>
                    <div className="text-gray-500 text-sm mt-2">请尝试调整筛选条件</div>
                </div>
            )}
        </div>
    );
};

export default ShopList;