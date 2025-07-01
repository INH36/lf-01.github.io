import React, { useState, useEffect } from 'react';
import { GitHubRepoItem } from '../../type';
import { faUser, faStar, faCodeFork, faTriangleExclamation, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className='w-full h-full py-5 flex flex-col justify-center items-center gap-6 bg-[#ebebeb]'>
            <h1>#{index + 1}</h1>
            <div className='w-1/2 h-40 relative flex justify-center items-center bg-gray-200 rounded-md overflow-hidden'>
                {!imageLoaded && !imageError && (
                    <div className='absolute inset-0 flex justify-center items-center bg-gray-200'>
                        <FontAwesomeIcon className='text-gray-400 text-4xl animate-pulse' icon={faImage} />
                    </div>
                )}
                {imageError && (
                    <div className='absolute inset-0 flex justify-center items-center bg-gray-200'>
                        <span className='text-gray-500'>加载失败</span>
                    </div>
                )}
                <img
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
                    src={details.owner.avatar_url}
                    alt={details.name}
                />
            </div>
            <span className='text-[#c83a30] lg:text-xl md:text-lg sm:text-sm text-sm font-semibold'>{details.name}</span>
            <ul className='flex gap-1 flex-col'>
                <li className='flex gap-2 justify-start items-center'>
                    <FontAwesomeIcon className='text-[#ffc07a]' icon={faUser} />
                    <span className='font-semibold'>{details.name}</span>
                </li>
                <li className='flex gap-2 justify-start items-center'>
                    <FontAwesomeIcon className='text-[#fcd700]' icon={faStar} />
                    <p>
                        <span className='text-lg'>{Number(details.stargazers_count).toLocaleString('en-US')}</span>
                        <span className=''> stars</span>
                    </p>
                </li>
                <li className='flex gap-2 justify-start items-center'>
                    <FontAwesomeIcon className='text-[#90cbf7]' icon={faCodeFork} />
                    <p>
                        <span className='text-lg'>{Number(details.forks_count).toLocaleString('en-US')}</span>
                        <span className=''> forks</span>
                    </p>
                </li>
                <li className='flex gap-2 justify-start items-center'>
                    <FontAwesomeIcon className='text-[#f38c9a]' icon={faTriangleExclamation} />
                    <p>
                        <span className='text-lg'>{Number(details.open_issues_count).toLocaleString('en-US')}</span>
                        <span className=''> open issues</span>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default HotItem;