import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import Warn from './components/warn';
import { warnManager } from './utils/warnManager';

function App() {
  const [warnVisible, setWarnVisible] = useState(false);
  const [warnMessage, setWarnMessage] = useState('');

  useEffect(() => {
    // 设置警告管理器的回调函数
    warnManager.setCallback((message: string) => {
      setWarnMessage(message);
      setWarnVisible(true);
    });
  }, []);

  const handleCloseWarn = () => {
    setWarnVisible(false);
  };

  return (
    <>
      <Home />
      <Warn 
        message={warnMessage}
        visible={warnVisible}
        onClose={handleCloseWarn}
        duration={5000}
      />
    </>
  );
}

export default App;
