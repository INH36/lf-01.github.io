import React, { useState } from 'react';
import { Slider, InputNumber, Card, Divider, Space, Button, Checkbox } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, ReloadOutlined } from '@ant-design/icons';
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
    <Card title="商品筛选" className="w-full max-w-md">
      <Space direction="vertical" className="w-full" size="small">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">尺寸选择</h5>
          <div className="flex gap-2 flex-wrap">
            {sizeOptions.map(option => (
              <Checkbox
                key={option.value}
                checked={selectedSizes.includes(option.value)}
                onChange={(e) => handleSingleSizeChange(option.value, e.target.checked)}
                className="text-sm"
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
        </div>
        <Divider />
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
            <InputNumber
              min={0}
              max={10000}
              step={10}
              value={shop.priceRange[0]}
              onChange={(value) => handlePriceChange([value || 0, shop.priceRange[1]])}
              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as any}
              className="w-28"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">最高:</span>
            <InputNumber
              min={0}
              max={10000}
              step={10}
              value={shop.priceRange[1]}
              onChange={(value) => handlePriceChange([shop.priceRange[0], value || 0])}
              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/¥\s?|(,*)/g, '') as any}
              className="w-28"
            />
          </div>
        </div>
        <Divider />

        {/* 价格排序 */}
        <h4 className="font-medium">价格排序</h4>
        <Space className="w-full">
          <Button
            type={shop.sortOrder === 'asc' ? 'primary' : 'default'}
            icon={<SortAscendingOutlined />}
            onClick={() => handleSortChange(shop.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex-1"
          >
            价格升序
          </Button>
          <Button
            type={shop.sortOrder === 'desc' ? 'primary' : 'default'}
            icon={<SortDescendingOutlined />}
            onClick={() => handleSortChange(shop.sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex-1"
          >
            价格降序
          </Button>
        </Space>

        <Divider />
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={handleReset}
          className="w-full"
        >
          重置筛选
        </Button>
      </Space>
    </Card>
  );
}

export default CategoryFilter;