import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../redux/store';

import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import ContactsPage from '../components/pages/ContactsPage/ContactsPage';
import Navigation from '../components/Navigation/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
