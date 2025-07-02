import React from 'react';
import { GitHubUser } from '../../type';
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLocationArrow, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

interface BattleResultProps {
    userOne?: GitHubUser;
    userTwo?: GitHubUser;
}

// 计算用户得分的函数
const calculateScore = (user: GitHubUser): number => {
    const { followers, following, public_repos, public_gists } = user;
    // 简单的计分算法：followers权重最高，其次是repos，然后是gists，following权重较低
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

const BattleResult: React.FC<BattleResultProps> = ({ userOne, userTwo }) => {
    if (!userOne || !userTwo) {
        return <div className='result'>Loading battle results...</div>;
    }

    const scoreOne = calculateScore(userOne);
    const scoreTwo = calculateScore(userTwo);
    const winner = scoreOne > scoreTwo ? userOne : userTwo;
    const loser = scoreOne > scoreTwo ? userTwo : userOne;
    const winnerScore = Math.max(scoreOne, scoreTwo);
    const loserScore = Math.min(scoreOne, scoreTwo);

    return (
        <div className='resule'>
            <div className='resule_item'>
                <span>Loser</span>
                <img className='resule_item_img' src={loser.avatar_url} alt={loser.login} />
                <span className='scores'>Scores: {Math.round(loserScore)}</span>
                <span className='resle_name'>{loser.name || loser.login}</span>
                <ul className='resule_item_info'>
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
            <div className='resule_item'>
                <span>Winner</span>
                <img className='resule_item_img' src={winner.avatar_url} alt={winner.login} />
                <span className='scores'>Scores: {Math.round(winnerScore)}</span>
                <span className='resle_name'>{winner.name || winner.login}</span>
                <ul className='resule_item_info'>
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
    );
};

export default BattleResult;