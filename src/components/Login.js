import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import '../App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(user => user.username === username && user.password === password);

    
    if (user) {
      onLogin(username); 
      navigate('/'); 
    } else {
      setError('Kullanıcı adı veya şifre yanlış!');
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
