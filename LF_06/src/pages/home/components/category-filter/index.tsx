import React, { useState } from 'react';
import { Slider } from 'antd';
import sortAscendingOutlined from '@/assets/SortAscendingOutlined.svg'
import sortDescendingOutlined from '@/assets/SortDescendingOutlined.svg'
import reloadOutlined from '@/assets/ReloadOutlined.svg'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { resetFilters, togglePriceRange, toggleSizeSelect, toggleSortOrder } from '@/store/silce/shopSlice';

const CategoryFilter: React.FC = () => {

  const shop = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState<string[]>(shop.selectSize);

  // 尺寸选项配置
  const sizeOptions = [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
  ];

  // 价格范围配置
  const priceMarks = {
    0: '¥0',
    10000: '¥10K'
  };

  // 处理尺寸选择
  const handleSingleSizeChange = (size: string, checked: boolean) => {
    console.log(size, checked);
    dispatch(toggleSizeSelect(size));
    const newSelectedSizes = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    setSelectedSizes(newSelectedSizes);
  };

  // 处理价格范围变化
  const handlePriceChange = (value: number[]) => {
    dispatch(togglePriceRange(value as [number, number]));
  };

  // 处理排序变化
  const handleSortChange = (order: 'asc' | 'desc') => {
    dispatch(toggleSortOrder(order));
  };

  // 重置所有筛选条件
  const handleReset = () => {
    const defaultSelectedSizes: string[] = [];
    setSelectedSizes(defaultSelectedSizes);
    dispatch(resetFilters())
  };


  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
      <span>商品筛选</span>
      <div className="w-full space-y-3">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">尺寸选择</h5>
          <div className="flex gap-2 flex-wrap">
            {sizeOptions.map(option => (
              <label key={option.value} className="flex items-center gap-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(option.value)}
                  onChange={(e) => handleSingleSizeChange(option.value, e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <h4 className="font-medium">价格范围</h4>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={10000}
            marks={priceMarks}
            value={shop.priceRange}
            onChange={handlePriceChange}
            tooltip={{ formatter: (value) => `¥${value}` }}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">最低:</span>
            <input
              type="number"
              min={0}
              max={10000}
              step={10}
              value={shop.priceRange[0]}
              onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, shop.priceRange[1]])}
              className="w-28 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">最高:</span>
            <input
              type="number"
              min={0}
              max={10000}
              step={10}
              value={shop.priceRange[1]}
              onChange={(e) => handlePriceChange([shop.priceRange[0], parseInt(e.target.value) || 0])}
              className="w-28 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 my-4"></div>

        {/* 价格排序 */}
        <h4 className="font-medium">价格排序</h4>
        <div className="w-full flex gap-2">
          <button
            onClick={() => handleSortChange(shop.sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`flex-1 px-4 py-2 rounded border transition-colors flex items-center justify-center gap-2 ${
              shop.sortOrder === 'asc' 
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <img className='w-4 h-4' src={sortAscendingOutlined} alt="" />
            价格升序
          </button>
          <button
            onClick={() => handleSortChange(shop.sortOrder === 'desc' ? 'asc' : 'desc')}
            className={`flex-1 px-4 py-2 rounded border transition-colors flex items-center justify-center gap-2 ${
              shop.sortOrder === 'desc' 
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <img className='w-4 h-4' src={sortDescendingOutlined} alt="" />
            价格降序
          </button>
        </div>

        <div className="border-t border-gray-200 my-4"></div>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        > 
          <img className='w-4 h-4' src={reloadOutlined} alt="" />
          重置筛选
        </button>
      </div>
    </div>
  );
}

export default CategoryFilter;