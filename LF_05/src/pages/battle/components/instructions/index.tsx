import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faJetFighter, faTrophy } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './index.scss'

const Instructions:React.FC = () => {
    return (
        <div className='battle'>
            <h1>Instructions</h1>
            <div className='battle__content'>
                <div className='battle__content-item'>
                    <h2>Enter two Github users</h2>
                    <div className='icon-con'>
                        <FontAwesomeIcon className='user-icon' icon={faUsers} />
                    </div>
                </div>
                <div className='battle__content-item'>
                    <h2>Battle</h2>
                    <div className='icon-con'>
                        <FontAwesomeIcon className='battle-icon' icon={faJetFighter} />
                    </div>
                </div>
                <div className='battle__content-item'>
                    <h2>Winner</h2>
                    <div className='icon-con'>
                        <FontAwesomeIcon className='winner-icon' icon={faTrophy} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;