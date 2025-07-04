import React, { useEffect, useState } from 'react';
import { GitHubUser } from '../battle/type';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLocationArrow, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';
import { getUserInfo } from '../battle/server';

// 计算用户得分的函数
const calculateScore = (user: GitHubUser): number => {
	const { followers, following, public_repos, public_gists } = user;
	return followers * 3 + public_repos * 2 + public_gists * 1 + following * 0.5;
};

// 格式化数字显示
const formatNumber = (num: number): string => {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
};

const BattleResult: React.FC = () => {
	const [userOne, setUserOne] = useState<GitHubUser | null>(null);
	const [userTwo, setUserTwo] = useState<GitHubUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const loadUserData = async () => {
			try {
				// 首先尝试从路由状态获取数据
				if (location.state?.userOne && location.state?.userTwo) {
					setUserOne(location.state.userOne);
					setUserTwo(location.state.userTwo);
					setIsLoading(false);
					return;
				}

				// 如果路由状态没有数据，尝试从URL参数获取
				const urlParams = new URLSearchParams(location.search);
				const oneParam = urlParams.get('one');
				const twoParam = urlParams.get('two');

				if (oneParam && twoParam) {
					const [userData1, userData2] = await Promise.all([getUserInfo(oneParam), getUserInfo(twoParam)]);
					setUserOne(userData1);
					setUserTwo(userData2);
				} else {
					// 如果没有数据，跳转回battle页面
					navigate('/battle');
					return;
				}
			} catch (error) {
				console.error('Failed to load user data:', error);
				navigate('/battle');
			} finally {
				setIsLoading(false);
			}
		};

		loadUserData();
	}, [location, navigate]);

	const handleReset = () => {
		navigate('/battle');
	};

	if (isLoading) {
		return <div className="result">Loading battle results...</div>;
	}

	if (!userOne || !userTwo) {
		return <div className="result">No battle data found. Redirecting...</div>;
	}

	const scoreOne = calculateScore(userOne);
	const scoreTwo = calculateScore(userTwo);
	const winner = scoreOne > scoreTwo ? userOne : userTwo;
	const loser = scoreOne > scoreTwo ? userTwo : userOne;
	const winnerScore = Math.max(scoreOne, scoreTwo);
	const loserScore = Math.min(scoreOne, scoreTwo);

	return (
		<div className="resule">
			<div className="res_con">
				<div className="resule_item">
					<span>Loser</span>
					<img className="resule_item_img" src={loser.avatar_url} alt={loser.login} />
					<span className="scores">Scores: {Math.round(loserScore)}</span>
					<span className="resle_name">{loser.name || loser.login}</span>
					<ul className="resule_item_info">
						<li>
							<FontAwesomeIcon icon={faLocationArrow} />
							<span>{loser.location || 'Unknown'}</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faUsers} />
							<span>{formatNumber(loser.followers)} followers</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faUserPlus} />
							<span>{formatNumber(loser.following)} following</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faCode} />
							<span>{formatNumber(loser.public_repos)} repos</span>
						</li>
					</ul>
				</div>
				<div className="resule_item">
					<span>Winner</span>
					<img className="resule_item_img" src={winner.avatar_url} alt={winner.login} />
					<span className="scores">Scores: {Math.round(winnerScore)}</span>
					<span className="resle_name">{winner.name || winner.login}</span>
					<ul className="resule_item_info">
						<li>
							<FontAwesomeIcon icon={faLocationArrow} />
							<span>{winner.location || 'Unknown'}</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faUsers} />
							<span>{formatNumber(winner.followers)} followers</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faUserPlus} />
							<span>{formatNumber(winner.following)} following</span>
						</li>
						<li>
							<FontAwesomeIcon icon={faCode} />
							<span>{formatNumber(winner.public_repos)} repos</span>
						</li>
					</ul>
				</div>
			</div>

			<button className="reset-btn" onClick={handleReset}>
				RESET
			</button>
		</div>
	);
};

export default BattleResult;
