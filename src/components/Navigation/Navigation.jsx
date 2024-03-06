import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';
const Navigation = () => {
  return (
    <nav>
      <ul className={styles.li}>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
