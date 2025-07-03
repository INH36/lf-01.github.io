import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateCartQuantity, clearCart, toggleCartIconClick } from '@/store/silce/shopSlice';
import { Popconfirm, message } from 'antd';
import shopCartIcon from '@/assets/shop-cart.svg'
import clearIcon from '@/assets/clear.svg'

const ShopCarts: React.FC = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state: RootState) => state.shop);

    // 计算总价
    const totalPrice = cart.reduce((total, item) => {
        return total + (item.product.price * item.num);
    }, 0);

    // 计算总数量
    const totalQuantity = cart.reduce((total, item) => {
        return total + item.num;
    }, 0);

    // 删除商品
    const handleRemoveItem = (productId: string, selectedSize: string) => {
        dispatch(removeFromCart({ productId, selectedSize }));
        message.success('商品已从购物车移除');
    };

    // 更新数量
    const handleQuantityChange = (productId: string, selectedSize: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(productId, selectedSize);
            return;
        }
        dispatch(updateCartQuantity({ productId, selectedSize, quantity }));
    };

    // 清空购物车
    const handleClearCart = () => {
        dispatch(clearCart());
        message.success('购物车已清空');
    };

    // 结算
    const handleCheckout = () => {
        if (cart.length === 0) {
            message.info('购物车为空，无法结算');
            return;
        }
        dispatch(toggleCartIconClick());
        message.info(`结算成功！总金额：¥${totalPrice.toFixed(2)}`);
        dispatch(clearCart());
    };

    if (cart.length === 0) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="flex flex-col items-center justify-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"></path>
                    </svg>
                    <p className="text-gray-500">购物车为空</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <img src={shopCartIcon} alt="" className='w-8 h-8 text-black' />
                        购物车
                        <span className="text-sm font-normal text-gray-500">({totalQuantity}件商品)</span>
                    </h2>
                    <Popconfirm
                        title="确定要清空购物车吗？"
                        description="此操作不可撤销"
                        onConfirm={handleClearCart}
                        okText="确定"
                        cancelText="取消"
                    >
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                            <img className='w-5 h-5' src={clearIcon} alt="" />
                            清空购物车
                        </button>
                    </Popconfirm>
                </div>

                <div className="flex-1 overflow-auto space-y-3 mb-4">
                    {cart.map((item) => (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="shadow-sm border p-5 rounded-xl hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 flex gap-2">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-16 h-16  object-cover rounded"
                                    />
                                    <div className='flex-1 flex flex-col'>
                                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                                            {item.product.name}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            尺寸: <span className="font-medium">{item.selectedSize}</span>
                                        </span>
                                        <div className='text-xs text-gray-500 flex gap-2'>
                                            <span>数量：
                                                <input
                                                    type="number"
                                                    className="font-medium w-16 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                    value={item.num}
                                                    min={1}
                                                    onChange={(e) => handleQuantityChange(item.product.id, item.selectedSize, parseInt(e.target.value) || 1)} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <div className="text-right min-w-0">
                                        <div className="text-lg font-bold text-red-500">
                                            ¥{(item.product.price * item.num).toFixed(2)}
                                        </div>
                                    </div>

                                    <Popconfirm
                                        title="确定要删除这个商品吗？"
                                        onConfirm={() => handleRemoveItem(item.product.id, item.selectedSize)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <button
                                            className="flex-shrink-0 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                        >
                                            <img className='w-5 h-5' src={clearIcon} alt="" />
                                        </button>
                                    </Popconfirm>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-medium text-gray-700">
                                共 {totalQuantity} 件商品
                            </span>
                            <span className="text-2xl font-bold text-red-500">
                                总计: ¥{totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full h-12 text-lg font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            立即结算
                        </button>
                    </div>
                </div>
            </div >
        </>

    );
};

export default ShopCarts;