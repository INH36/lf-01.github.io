import React from 'react';

const SkeletonItem: React.FC = () => {
    return (
        <div className='w-full h-full py-5 flex flex-col justify-center items-center gap-6 bg-[#ebebeb] animate-pulse'>
            <div className='h-6 w-8 bg-gray-300 rounded'></div>
            <div className='w-1/2 h-40 bg-gray-300 rounded-md'></div>
            <div className='h-6 w-24 bg-gray-300 rounded'></div>
            <div className='flex gap-1 flex-col w-full px-4 justify-center items-center'>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                    <div className='h-4 w-32 bg-gray-300 rounded'></div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                    <div className='h-4 w-32 bg-gray-300 rounded'></div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                    <div className='h-4 w-32 bg-gray-300 rounded'></div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                    <div className='h-4 w-32 bg-gray-300 rounded'></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonItem;