import React, { useState, useEffect } from 'react';
import Login from './Login';
import './Login.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [developers, setDevelopers] = useState([
    { id: 1, name: 'Jean Claude', role: 'Frontend Developer' },
    { id: 2, name: 'Marie Jeanne', role: 'Backend Developer' },
    { id: 3, name: 'Eric Uwimana', role: 'Fullstack Developer' }
  ]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');

  // Reba niba umuntu yari yarinjiye mbere
  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleAddDeveloper = (e) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    const newDev = {
      id: Date.now(),
      name: newName,
      role: newRole
    };

    setDevelopers([...developers, newDev]);
    setNewName('');
    setNewRole('');
  };

  const handleDeleteDeveloper = (id) => {
    setDevelopers(developers.filter(dev => dev.id !== id));
  };

  // Niba atarinjira, erekana Login page
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Niba yinjiriye neza, erekana Dashboard y'Abadevelopers mu mabara y'u Rwanda
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #00A3E0, #FAD201, #206C49)', padding: '30px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', borderTop: '6px solid #00A3E0' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
          <h2 style={{ color: '#206C49', margin: 0 }}>Rwanda Developer Management</h2>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Sohoka (Logout)
          </button>
        </div>

        {/* Form yo kongeramo Developer mushya */}
        <form onSubmit={handleAddDeveloper} style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Amazina y'umudeveloper" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', outline: 'none' }}
            required
          />
          <input 
            type="text" 
            placeholder="Inshingano (Role e.g React Dev)" 
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', outline: 'none' }}
            required
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#206C49', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', borderBottom: '3px solid #FAD201' }}
          >
            Ongeramo
          </button>
        </form>

        {/* Urutonde rw'Abadevelopers */}
        <h3 style={{ color: '#00A3E0', marginBottom: '15px' }}>Abadevelopers Banditse muri System:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {developers.map((dev) => (
            <div key={dev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: '#f9f9f9', borderLeft: '4px solid #00A3E0', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '16px', color: '#333' }}>{dev.name}</strong>
                <p style={{ margin: '3px 0 0 0', fontSize: '13px', color: '#666' }}>{dev.role}</p>
              </div>
              <button 
                onClick={() => handleDeleteDeveloper(dev.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Siba
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;