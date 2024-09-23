
import React from 'react';
import './MovieList.css'; 
import './Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2 style={{textAlign:'center'}}>Favori Diziler/Filmler</h2>
      {favorites.length === 0 ? (
        <p style={{textAlign:'center'}}>Henüz favorilere eklenen dizi/film yok.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(movie => (
            <div key={movie.imdbID} className="favorites-item">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <button onClick={() => removeFromFavorites(movie.imdbID)}>Favorilerden Çıkar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
