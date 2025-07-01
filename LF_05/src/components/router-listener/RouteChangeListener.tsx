import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由变化监听组件
 */

const RouteChangeListener: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('路由变化:', location.pathname);
    
  }, [location.pathname]);

  return null;
};

export default RouteChangeListener;