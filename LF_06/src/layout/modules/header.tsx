import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleCartIconClick } from '@/store/silce/shopSlice';

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const shop = useSelector((state: RootState) => state.shop);
    const clickShopCart = () => {
        dispatch(toggleCartIconClick());
    }
    useEffect(() => {
        console.log(shop.isCartIconClick);
    }, [shop.isCartIconClick])


    return (
        <div className='w-full h-12 bg-[#001528] flex justify-between items-center px-16'>
            <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faBagShopping} className='text-white' />
                <span className='text-white'>江南服装厂</span>
            </div>

            <div className=' relative flex justify-center items-center cursor-pointer' onClick={clickShopCart}>
                <FontAwesomeIcon className='text-white text-2xl' icon={faCartShopping} />
                <i className='absolute top-[-5px] right-[-14px] border border-white bg-red-500 min-w-[20px] h-[20px] rounded-full text-[10px] text-white flex justify-center items-center px-1'>99+</i>
            </div>
        </div>
    );
};

export default Header;