import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterRequest from './pages/RegisterRequest';
import RequestsList from './pages/RequestsList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    console.log('Login successful');
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/registrar" 
          element={isLoggedIn ? <RegisterRequest /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/solicitudes" 
          element={isLoggedIn ? <RequestsList /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}

export default App;
