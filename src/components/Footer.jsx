import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';
import colors from '../styles/colors';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: colors.primary, color: colors.textbody }}>
            <div className="footer-links">
                <a href="mailto:nadyasavaa@gmail.com" aria-label="Email">
                    <FaEnvelope />
                </a>
                <a href="https://www.linkedin.com/in/nadyasavamaritza" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/nadyasava" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub />
                </a>
            </div>
            <p>&copy; 2024 StreamFlix - Nadya Sava Maritza. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
