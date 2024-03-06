import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Importujemy reducer z pliku userSlice.jsx
import phonebookReducer from './phonebookSlice';

export default configureStore({
  reducer: {
    user: userReducer, // Dodajemy reducer użytkownika
    phonebook: phonebookReducer,
  },
});
