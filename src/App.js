import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const [balance, setBalance] = useState(100000);
  const [ownedMovies, setOwnedMovies] = useState([]);

  const handleMoviePurchase = (movieId) => {
    const numericId = Number(movieId);
    if (!ownedMovies.includes(numericId)) {
      setOwnedMovies((prev) => [...prev, numericId]);
    }
  };

  return (
    <div>
      <Header balance={balance} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage ownedMovies={ownedMovies} />} />
          <Route
            path="/:id"
            element={
              <DetailPage
                balance={balance}
                setBalance={setBalance}
                onPurchase={handleMoviePurchase}
                ownedMovies={ownedMovies}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
