import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = ({ onMoviesFetched }) => {
  const [query, setQuery] = useState('');

  const searchMovies = async () => {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=f73519fa`);
    if (response.data.Search) {
      onMoviesFetched(response.data.Search);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Lütfen dizi/film adı girin." 
        style={{ width: '400px',marginRight: '10px',marginLeft:'400px', }}
      />
      <button onClick={searchMovies}>Ara</button>
    </div>
  );
};

export default MovieSearch;
