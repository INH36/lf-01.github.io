import React, { Suspense, ComponentType, useMemo, lazy } from 'react';
import { Spin } from 'antd';

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
  const LazyLoadedComponent = useMemo(() => lazy(importComponent), [importComponent]);
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
export type { LazyComponentProps };
