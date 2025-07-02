import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home: React.FC = () => {
    const nav = useNavigate()
    useEffect(() => {
        nav('/popular')
    }, [nav])
    return (
        <></>
    );
};

export default Home;