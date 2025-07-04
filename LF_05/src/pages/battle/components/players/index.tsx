import React, { useEffect, useState } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';

const Players: React.FC = () => {
	const [playerOne, setPlayerOne] = useState('');
	const [playerTwo, setPlayerTwo] = useState('');
	const [submittedOne, setSubmittedOne] = useState(false);
	const [submittedTwo, setSubmittedTwo] = useState(false);
	const [loadingOne, setLoadingOne] = useState(false);
	const [loadingTwo, setLoadingTwo] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const url = new URLSearchParams(location.search);
		const one = url.get('one');
		const two = url.get('two');

		const loadUserData = async () => {
			if (one) {
				setPlayerOne(one);
				setSubmittedOne(true);
				setLoadingOne(true);
				setLoadingOne(false);
			}
			if (two) {
				setPlayerTwo(two);
				setSubmittedTwo(true);
				setLoadingTwo(true);
				setLoadingTwo(false);
			}
		};
		loadUserData();
	}, [location]);

	const handleSubmitOne = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!playerOne.trim()) return;
		setLoadingOne(true);
		const url = new URL(window.location.href);
		url.searchParams.set('one', playerOne);
		window.history.replaceState(null, '', url.toString());
		setSubmittedOne(true);
		setLoadingOne(false);
	};

	const handleSubmitTwo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!playerTwo.trim()) return;
		setLoadingTwo(true);

		const url = new URL(window.location.href);
		url.searchParams.set('two', playerTwo);
		window.history.replaceState(null, '', url.toString());
		setSubmittedTwo(true);
		setLoadingTwo(false);
	};

	const close = (type: 'one' | 'two') => {
		if (type === 'one') {
			setPlayerOne('');
			setSubmittedOne(false);
		} else {
			setPlayerTwo('');
			setSubmittedTwo(false);
		}
	};

	const battle = () => {
		if (playerOne && playerTwo) {
			navigate(`/battle/result?one=${playerOne}&two=${playerTwo}`);
		}
	};

	return (
		<div className="players-container">
			<h1 className="players-title">Players</h1>
			<div className="players-flex">
				<div className="player-card">
					<span className="player-label">Player One</span>
					<form onSubmit={handleSubmitOne} className="player-form" style={{ display: submittedOne ? 'none' : 'flex' }}>
						<input
							type="text"
							placeholder="github username"
							value={playerOne}
							onChange={(e) => setPlayerOne(e.target.value)}
							disabled={submittedOne}
							className="player-input"
						/>
						<button type="submit" disabled={!playerOne.trim() || submittedOne || loadingOne} className="player-btn">
							{loadingOne ? 'LOADING...' : 'SUBMIT'}
						</button>
					</form>

					<div className="player-user" style={{ display: submittedOne ? 'flex' : 'none' }}>
						<div className="player-avater">
							<img loading="lazy" src={`https://github.com/${playerOne}.png?size=200`} alt={playerOne} />
							<span>{playerOne}</span>
						</div>
						<i className="icon-close" onClick={() => close('one')}>
							<FontAwesomeIcon icon={faXmark} />
						</i>
					</div>
				</div>
				<div className="player-card">
					<span className="player-label">Player Two</span>
					<form onSubmit={handleSubmitTwo} className="player-form" style={{ display: submittedTwo ? 'none' : 'flex' }}>
						<input
							type="text"
							placeholder="github username"
							value={playerTwo}
							onChange={(e) => setPlayerTwo(e.target.value)}
							disabled={submittedTwo}
							className="player-input"
						/>
						<button type="submit" disabled={!playerTwo.trim() || submittedTwo || loadingTwo} className="player-btn">
							{loadingTwo ? 'LOADING...' : 'SUBMIT'}
						</button>
					</form>

					<div className="player-user" style={{ display: submittedTwo ? 'flex' : 'none' }}>
						<div className="player-avater">
							<img loading="lazy" src={`https://github.com/${playerTwo}.png?size=200`} alt={playerTwo} />
							<span>{playerTwo}</span>
						</div>
						<i className="icon-close" onClick={() => close('two')}>
							<FontAwesomeIcon icon={faXmark} />
						</i>
					</div>
				</div>
			</div>
			<div className={`battle-btn`} style={{ display: submittedOne && submittedTwo ? 'flex' : 'none' }} onClick={() => battle()}>
				BATTLING
			</div>
		</div>
	);
};

export default Players;
