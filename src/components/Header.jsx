import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';
import '../styles/Header.css';
import colors from '../styles/colors';

const Header = ({ balance }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTitleClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    return (
        <header className="header">
            <h1 className="header-title" onClick={handleTitleClick}>
                StreamFlix
            </h1>
            <div className="header-balance">
                <FaWallet className="wallet-icon" />
                Balance: Rp. {balance}
            </div>
        </header>
    );
};

export default Header;
