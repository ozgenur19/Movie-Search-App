import React from 'react';

const MovieList = ({ movies, addToFavorites, removeFromFavorites, favorites }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.imdbID} className="movie-item">
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          {favorites.some(fav => fav.imdbID === movie.imdbID) ? (
            <button onClick={() => removeFromFavorites(movie.imdbID)}>Favorilerden Çıkar</button>
          ) : (
            <button onClick={() => addToFavorites(movie)}>Favorilere Ekle</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
