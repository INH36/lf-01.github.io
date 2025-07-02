import React, { useState } from 'react';
import { Slider, InputNumber, Card, Divider, Space, Button, Checkbox } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, ReloadOutlined } from '@ant-design/icons';

interface CategoryFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  selectedSizes: string[];
  priceRange: [number, number];
  sortOrder: 'asc' | 'desc' | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

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

  // 处理单个尺寸选择
  const handleSingleSizeChange = (size: string, checked: boolean) => {
    const newSelectedSizes = checked
      ? [...selectedSizes, size]
      : selectedSizes.filter(s => s !== size);
    setSelectedSizes(newSelectedSizes);
    notifyFilterChange({ selectedSizes: newSelectedSizes, priceRange, sortOrder });
  };

  // 处理价格范围变化
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0] || 0, value[1] || 0];
    setPriceRange(newRange);
    notifyFilterChange({ selectedSizes, priceRange: newRange, sortOrder });
  };

  // 处理排序变化
  const handleSortChange = (order: 'asc' | 'desc' | null) => {
    setSortOrder(order);
    notifyFilterChange({ selectedSizes, priceRange, sortOrder: order });
  };

  // 重置所有筛选条件
  const handleReset = () => {
    const defaultSelectedSizes: string[] = [];
    const defaultPriceRange: [number, number] = [0, 10000];
    setSelectedSizes(defaultSelectedSizes);
    setPriceRange(defaultPriceRange);
    setSortOrder(null);
    notifyFilterChange({ selectedSizes: defaultSelectedSizes, priceRange: defaultPriceRange, sortOrder: null });
  };

  // 通知父组件筛选条件变化
  const notifyFilterChange = (filters: FilterState) => {
    onFilterChange?.(filters);
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
              value={priceRange}
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
                value={priceRange[0]}
                onChange={(value) => handlePriceChange([value || 0, priceRange[1]])}
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
                value={priceRange[1]}
                onChange={(value) => handlePriceChange([priceRange[0], value || 0])}
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
              type={sortOrder === 'asc' ? 'primary' : 'default'}
              icon={<SortAscendingOutlined />}
              onClick={() => handleSortChange(sortOrder === 'asc' ? null : 'asc')}
              className="flex-1"
            >
              价格升序
            </Button>
            <Button
              type={sortOrder === 'desc' ? 'primary' : 'default'}
              icon={<SortDescendingOutlined />}
              onClick={() => handleSortChange(sortOrder === 'desc' ? null : 'desc')}
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
};

export default CategoryFilter;