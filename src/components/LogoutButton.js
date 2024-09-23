import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    onLogout();
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout}>Çıkış Yap</button>
  );
};

export default LogoutButton;
