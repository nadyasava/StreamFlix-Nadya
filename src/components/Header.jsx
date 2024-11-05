import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import colors from '../styles/colors';

const Header = () => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <header style={{ backgroundColor: colors.primary, padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: colors.secondary, cursor: 'pointer' }} onClick={handleTitleClick}>
                StreamFlix
            </h1>
        </header>
    );
};

export default Header;
