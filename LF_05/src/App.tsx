import React from 'react';
import RouterListener from '@/components/router-listener';

const App: React.FC = () => {
	return (
		<div className="App">
			<RouterListener />
		</div>
	);
};

// 测试husky和lint-staged配置 - 最终测试
const   badFormat   =   "test"   ;   // 故意的格式问题

export default App;
