import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ contact, deleteContact }) => {
  const { id, name = 'Unknown', phone = 'No number' } = contact;

  return (
    <li className={styles.contactItem} key={id}>
      <span className={styles.contactInfo}>
        {name}: {phone}
      </span>
      <button onClick={deleteContact}>Delete</button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default Contact;
