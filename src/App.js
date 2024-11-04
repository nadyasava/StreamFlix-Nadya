import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {/* Define other routes here if needed */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;