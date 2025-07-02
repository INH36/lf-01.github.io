import React, { useState, useEffect } from 'react';
import './styles/index.scss'
import Instructions from './components/instructions';
import Players from './components/players';
import BattleResult from './components/battle-result';
import { GitHubUser } from './type';
import { useLocation } from 'react-router';
import { getUserInfo } from './server';

type BattleStep = 'setup' | 'result';

const Battle: React.FC = () => {
    const [step, setStep] = useState<BattleStep>('setup');
    const [userOne, setUserOne] = useState<GitHubUser>();
    const [userTwo, setUserTwo] = useState<GitHubUser>();
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    // 从URL恢复状态
    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const stepParam = url.get('step');
        const oneParam = url.get('one');
        const twoParam = url.get('two');

        const restoreState = async () => {
            if (stepParam === 'result' && oneParam && twoParam) {
                setIsLoading(true);
                try {
                    const [userData1, userData2] = await Promise.all([
                        getUserInfo(oneParam),
                        getUserInfo(twoParam)
                    ]);
                    setUserOne(userData1);
                    setUserTwo(userData2);
                    setStep('result');
                } catch (error) {
                    console.error('Failed to restore battle state:', error);
                    setStep('setup');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        restoreState();
    }, [location]);

    const handleBattle = async (playerOne: GitHubUser, playerTwo: GitHubUser) => {
        setIsLoading(true);
        setUserOne(playerOne);
        setUserTwo(playerTwo);
        
        // 更新URL参数
        const url = new URL(window.location.href);
        url.searchParams.set('step', 'result');
        url.searchParams.set('one', playerOne.login);
        url.searchParams.set('two', playerTwo.login);
        window.history.replaceState(null, '', url.toString());
        
        // 模拟battle计算过程
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStep('result');
        setIsLoading(false);
    };

    const handleReset = () => {
        setStep('setup');
        setUserOne(undefined);
        setUserTwo(undefined);
        setIsLoading(false);
        
        // 清除URL参数
        const url = new URL(window.location.href);
        url.searchParams.delete('step');
        url.searchParams.delete('one');
        url.searchParams.delete('two');
        window.history.replaceState(null, '', url.toString());
    };

    return (
        <div className='battle-container'>
            {step === 'setup' && (
                <div className='main'>
                    <Instructions />
                    <div className='player-content'>
                        <Players onBattle={handleBattle} isLoading={isLoading} />
                    </div>
                </div>
            )}
            {step === 'result' && (
                <div className='main'>
                    <BattleResult userOne={userOne} userTwo={userTwo}/>
                    <button className='reset-btn' onClick={handleReset}>RESET</button>
                </div>
            )}
        </div>
    );
};

export default Battle;