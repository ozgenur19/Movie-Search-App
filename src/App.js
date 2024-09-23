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
    if (userName) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${userName}`));
      if (storedFavorites) {
        setFavorites(storedFavorites);
      } else {
        setFavorites([]); 
      }
    }
  }, [userName]);

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem(`favorites_${userName}`, JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userName}`, JSON.stringify(updatedFavorites));
  };

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setFavorites([]); 
  };

  return (
    <Router>
      <div>
        <nav>
          <h1>Dizi/Film Arama Uygulaması</h1>
          <div>
            {!isLoggedIn ? (
              <div>
                <Link to="/login">
                  <button>Giriş Yap</button>
                </Link>
                <Link to="/register">
                  <button>Kayıt Ol</button>
                </Link>
              </div>
            ) : (
              <div>
                <span><h3 style={{ textAlign: 'center' }}>Hoşgeldin, {userName} :)</h3></span>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
                  <button style={{ width: '150px' }}>Film Ara</button>
                </Link>
                <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>
                  <button style={{ cursor: 'pointer', width: '150px' }}>Favoriler ({favorites.length})</button>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    marginLeft: '10px',
                    color: 'white',
                    background: 'red',
                    border: 'none',
                    cursor: 'pointer',
                    width: '150px'
                  }}
                >
                  Çıkış Yap
                </button>
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
                  <MovieList
                    movies={movies}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    favorites={favorites}
                  />
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <h2>Lütfen üye girişi yapınız, eğer kayıtlı değilseniz kayıt ol butonuna tıklayınız.</h2>
                </div>
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
