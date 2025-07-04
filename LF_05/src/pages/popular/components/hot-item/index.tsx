import React, { useState, useEffect } from 'react';
import { GitHubRepoItem } from '../../type';
import { faUser, faStar, faCodeFork, faTriangleExclamation, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const HotItem: React.FC<GitHubRepoItem & { index: number }> = ({ index, ...details }) => {
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const [imageError, setImageError] = useState<boolean>(false);

	useEffect(() => {
		const img = new Image();
		img.src = details.owner.avatar_url;
		img.onload = () => setImageLoaded(true);
		img.onerror = () => setImageError(true);

		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [details.owner.avatar_url]);
	return (
		<div className="hot-item">
			<h1 className="hot-item__rank">#{index + 1}</h1>
			<div className="hot-item__avatar-container">
				{!imageLoaded && !imageError && (
					<div className="hot-item__loading-placeholder">
						<FontAwesomeIcon className="loading-icon" icon={faImage} />
					</div>
				)}
				{imageError && (
					<div className="hot-item__error-placeholder">
						<span className="error-text">加载失败</span>
					</div>
				)}
				<img
					className={`hot-item__avatar ${imageLoaded && !imageError ? 'hot-item__avatar--visible' : 'hot-item__avatar--hidden'}`}
					src={details.owner.avatar_url}
					alt={details.name}
				/>
			</div>
			<span className="hot-item__name">{details.name}</span>
			<ul className="hot-item__stats">
				<li className="hot-item__stat-item">
					<FontAwesomeIcon className="icon icon--user" icon={faUser} />
					<span className="stat-text">{details.name}</span>
				</li>
				<li className="hot-item__stat-item">
					<FontAwesomeIcon className="icon icon--star" icon={faStar} />
					<p>
						<span className="stat-number">{Number(details.stargazers_count).toLocaleString('en-US')}</span>
						<span className=""> stars</span>
					</p>
				</li>
				<li className="hot-item__stat-item">
					<FontAwesomeIcon className="icon icon--fork" icon={faCodeFork} />
					<p>
						<span className="stat-number">{Number(details.forks_count).toLocaleString('en-US')}</span>
						<span> forks</span>
					</p>
				</li>
				<li className="hot-item__stat-item">
					<FontAwesomeIcon className="icon icon--issue" icon={faTriangleExclamation} />
					<p>
						<span className="stat-number">{Number(details.open_issues_count).toLocaleString('en-US')}</span>
						<span> open issues</span>
					</p>
				</li>
			</ul>
		</div>
	);
};

export default HotItem;
