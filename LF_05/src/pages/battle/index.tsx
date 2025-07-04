import React from 'react';
import './styles/index.scss';
import Instructions from './components/instructions';
import Players from './components/players';
import { Outlet, useLocation } from 'react-router';

const Battle: React.FC = () => {
	const location = useLocation();
	const isResultPage = location.pathname === '/battle/result';

	return (
		<div className="battle-container">
			<Outlet />
			{!isResultPage && (
				<div className="main">
					<Instructions />
					<div className="player-content">
						<Players />
					</div>
				</div>
			)}
		</div>
	);
};

export default Battle;
