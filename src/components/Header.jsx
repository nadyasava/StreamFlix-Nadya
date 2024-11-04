import React from 'react';
import '../styles/Header.css';
import colors from '../styles/colors';

const Header = () => {
    return (
        <header style={{ backgroundColor: colors.primary, padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: colors.secondary }}>StreamFlix</h1>
        </header>
    );
};

export default Header;
