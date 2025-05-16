import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand-info">
          <h1>AgroLink </h1>
          <p>Connecting farmers to a sustainable future</p>
        </div>
      </div>
      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;