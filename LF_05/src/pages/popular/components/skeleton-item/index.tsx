import React from 'react';
import './index.scss';

const SkeletonItem: React.FC = () => {
    return (
        <div className='skeleton-item'>
            <div className='skeleton-item__rank'></div>
            <div className='skeleton-item__avatar'></div>
            <div className='skeleton-item__name'></div>
            <div className='skeleton-item__stats'>
                <div className='skeleton-item__stat-item'>
                    <div className='icon-placeholder'></div>
                    <div className='text-placeholder'></div>
                </div>
                <div className='skeleton-item__stat-item'>
                    <div className='icon-placeholder'></div>
                    <div className='text-placeholder'></div>
                </div>
                <div className='skeleton-item__stat-item'>
                    <div className='icon-placeholder'></div>
                    <div className='text-placeholder'></div>
                </div>
                <div className='skeleton-item__stat-item'>
                    <div className='icon-placeholder'></div>
                    <div className='text-placeholder'></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonItem;