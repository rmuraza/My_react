import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setIsError(true);
      setMessage("Banza wuzuze imeyili n'ijambo ry'ibanga!");
      return;
    }

    if (isRegistering) {
      const existingUser = localStorage.getItem(email);
      if (existingUser) {
        setIsError(true);
        setMessage("Imeyili yarakoreshejwe yamaze kwiyandikisha!");
        return;
      }

      localStorage.setItem(email, password);
      setIsError(false);
      setMessage("Wiyandikishe neza! Urashobora kwinjira.");
      setIsRegistering(false);
    } else {
      const savedPassword = localStorage.getItem(email);

      if ((email === "admin@rwanda.com" && password === "12345") || savedPassword === password) {
        setIsError(false);
        setMessage("Winjiye neza! Ugiye kwinjira muri Dashboard...");
        setTimeout(() => {
          onLoginSuccess(); // Hindura page ikajya muri Developer Dashboard
        }, 1000);
      } else {
        setIsError(true);
        setMessage("Imeyili cyangwa ijambo ry'ibanga sibyo!");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegistering ? "Kwiyandikisha (Register)" : "Kwinjira (Login)"}</h2>
        
        {message && (
          <p className={isError ? "error-message" : "success-message"}>
            {message}
          </p>
        )}

        <div className="input-group">
          <label>Imeyili (Email)</label>
          <input 
            type="email" 
            placeholder="admin@rwanda.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label>Ijambo ry'ibanga (Password)</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="12345" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hisha" : "Reba"}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {isRegistering ? "Iyandikishe" : "Injira"}
        </button>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button 
            type="button"
            onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }}
            style={{ background: 'none', border: 'none', color: '#00A3E0', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
          >
            {isRegistering ? "Usanzwe ufite konti? Injira" : "Nta konti ufite? Iyandikishe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;