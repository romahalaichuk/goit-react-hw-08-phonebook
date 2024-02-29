// ContactsPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import ContactForm from '../../ContactForm/ContactForm';
import ContactList from '../../ContactList/ContactList';
import UserMenu from '../../UserMenu/UserMenu';
import { Navigate } from 'react-router-dom';

const ContactsPage = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Contacts Page</h2>
      <UserMenu />
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
