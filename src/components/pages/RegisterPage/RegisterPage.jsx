// RegisterPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      navigate('/contacts');
    } catch (error) {
      setRegisterError(true);
    }
  };

  if (isLoggedIn) {
    navigate('/contacts');
    return null;
  }

  return (
    <div>
      <h2>Register</h2>
      {registerError && <p>Nieudana rejestracja. Spróbuj ponownie.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
