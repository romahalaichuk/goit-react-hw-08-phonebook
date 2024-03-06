import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/userSlice';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginUser({ email, password }));
      setEmail('');
      setPassword('');
      setIsLogged(true);
    } catch (error) {
      setLoginError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLogged) {
    return <Navigate to="/contacts" replace={true} />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
