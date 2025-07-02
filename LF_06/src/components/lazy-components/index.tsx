import React, { Suspense, ComponentType } from 'react';
import { Spin } from 'antd';

// 通用懒加载组件的 Props 接口
interface LazyComponentProps<T = any> {
  /** 懒加载的组件导入函数 */
  importComponent: () => Promise<{ default: ComponentType<T> }>;
  /** 传递给懒加载组件的 props */
  componentProps?: T;
  /** 自定义加载状态 UI */
  fallback?: React.ReactNode;
  /** 加载提示文本 */
  loadingTip?: string;
  /** 容器样式类名 */
  containerClassName?: string;
  /** 加载器大小 */
  spinSize?: 'small' | 'default' | 'large';
}

const LazyComponent = <T,>({
  importComponent,
  componentProps,
  fallback,
  loadingTip = '加载中...',
  containerClassName = 'w-full h-full flex items-center justify-center',
  spinSize = 'default'
}: LazyComponentProps<T>) => {
  // 创建懒加载组件
  const LazyLoadedComponent = React.lazy(importComponent);

  // 默认的 加载
  const defaultFallback = (
    <div className={containerClassName}>
      <Spin size={spinSize} tip={loadingTip} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyLoadedComponent {...(componentProps as any)} />
    </Suspense>
  );
};

export default LazyComponent;

// 导出类型定义供其他组件使用
export type { LazyComponentProps };
