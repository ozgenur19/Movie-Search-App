import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Register from './components/Register';
import MovieSearch from './components/MovieSearch';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'; 

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div>
        <nav>
          <h1>Dizi/Film Arama Uygulaması</h1>
          <div className="user-info">
            {isLoggedIn && <h3>Hoşgeldin, {userName} :)</h3>}
          </div>
          <div className="buttons">
            {!isLoggedIn ? (
              <div>
                <Link to="/login">
                  <button className="login-button">Giriş Yap</button>
                </Link>
                <Link to="/register">
                  <button className="register-button">Kayıt Ol</button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
                  <button className="film-search-button">Film Ara</button>
                </Link>
                <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>
                  <button className="film-search-button">Favoriler ({favorites.length})</button>
                </Link>
                <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div>
                  <MovieSearch onMoviesFetched={setMovies} />
                  <MovieList movies={movies} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} favorites={favorites} />
                </div>
              ) : (
                <div>Lütfen giriş yapın</div>
              )
            }
          />
          <Route
            path="/favorites"
            element={isLoggedIn ? <Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} /> : <div>Lütfen giriş yapın</div>}
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
