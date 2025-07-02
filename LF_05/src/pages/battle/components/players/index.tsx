import React, { useEffect, useState } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo } from '../../server';
import { GitHubUser } from '../../type';
import { useLocation } from 'react-router';

interface PlayersProps {
    onBattle: (playerOne: GitHubUser, playerTwo: GitHubUser) => void;
    isLoading: boolean;
}

const Players: React.FC<PlayersProps> = ({ onBattle, isLoading }) => {
    const [playerOne, setPlayerOne] = useState("");
    const [playerTwo, setPlayerTwo] = useState("");
    const [submittedOne, setSubmittedOne] = useState(false);
    const [submittedTwo, setSubmittedTwo] = useState(false);
    const [userOne, setUserOne] = useState<GitHubUser>();
    const [userTwo, setUserTwo] = useState<GitHubUser>();
    const [loadingOne, setLoadingOne] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [errorOne, setErrorOne] = useState<string>('');
    const [errorTwo, setErrorTwo] = useState<string>('');

    const location = useLocation()

    useEffect(() => {
        const url = new URLSearchParams(location.search)
        const one = url.get('one')
        const two = url.get('two')

        const loadUserData = async () => {
            if (one) {
                setPlayerOne(one)
                setSubmittedOne(true)
                setLoadingOne(true)
                const userData = await getUserInfo(one.trim())
                setUserOne(userData)
                setLoadingOne(false)

            }
            if (two) {
                setPlayerTwo(two)
                setSubmittedTwo(true)
                setLoadingTwo(true)
                const userData = await getUserInfo(two.trim())
                setUserTwo(userData)
                setLoadingTwo(false)

            }
        }

        loadUserData()
    }, [location])

    const handleSubmitOne = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerOne.trim()) return;
        setLoadingOne(true);
        setErrorOne('');
        const url = new URL(window.location.href)
        url.searchParams.set('one', playerOne)
        window.history.replaceState(null, '', url.toString())
        const userData = await getUserInfo(playerOne.trim());
        setUserOne(userData);
        setSubmittedOne(true);
        setLoadingOne(false);

    };

    const handleSubmitTwo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerTwo.trim()) return;
        setLoadingTwo(true);
        setErrorTwo('');
        const url = new URL(window.location.href)
        url.searchParams.set('two', playerTwo)
        window.history.replaceState(null, '', url.toString())
        const userData = await getUserInfo(playerTwo.trim());
        setUserTwo(userData);
        setSubmittedTwo(true);
        setLoadingTwo(false);

    };

    const close = (type: 'one' | 'two') => {
        if (type === 'one') {
            setPlayerOne('');
            setSubmittedOne(false);
            setUserOne(undefined);
            setErrorOne('');
        } else {
            setPlayerTwo('');
            setSubmittedTwo(false);
            setUserTwo(undefined);
            setErrorTwo('');
        }
    };

    const battle = () => {
        if (userOne && userTwo) {
            onBattle(userOne, userTwo);
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
                            onChange={e => setPlayerOne(e.target.value)}
                            disabled={submittedOne}
                            className="player-input"
                        />
                        <button
                            type="submit"
                            disabled={!playerOne.trim() || submittedOne || loadingOne}
                            className="player-btn"
                        >
                            {loadingOne ? 'LOADING...' : 'SUBMIT'}
                        </button>
                    </form>
                    {errorOne && <div className="error-message">{errorOne}</div>}
                    <div className='player-user' style={{ display: submittedOne ? 'flex' : 'none' }}>
                        <div className='player-avater'>
                            <img loading='lazy' src={`https://github.com/${playerOne}.png?size=200`} alt={playerOne} />
                            <span>{playerOne}</span>
                        </div>
                        <i className='icon-close' onClick={() => close('one')}>
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
                            onChange={e => setPlayerTwo(e.target.value)}
                            disabled={submittedTwo}
                            className="player-input"
                        />
                        <button
                            type="submit"
                            disabled={!playerTwo.trim() || submittedTwo || loadingTwo}
                            className="player-btn"
                        >
                            {loadingTwo ? 'LOADING...' : 'SUBMIT'}
                        </button>
                    </form>
                    {errorTwo && <div className="error-message">{errorTwo}</div>}
                    <div className='player-user' style={{ display: submittedTwo ? 'flex' : 'none' }}>
                        <div className='player-avater'>
                            <img loading='lazy' src={`https://github.com/${playerTwo}.png?size=200`} alt={playerTwo} />
                            <span>{playerTwo}</span>
                        </div>
                        <i className='icon-close' onClick={() => close('two')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </i>
                    </div>
                </div>
            </div>
            <div
                className={`battle-btn ${isLoading ? 'loading' : ''}`}
                style={{ display: submittedOne && submittedTwo ? 'flex' : 'none' }}
                onClick={!isLoading ? battle : undefined}
            >
                {isLoading ? 'BATTLING...' : 'BATTLE'}
            </div>
        </div>
    );
};

export default Players;