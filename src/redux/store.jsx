import { configureStore } from '@reduxjs/toolkit';
import userReducer from './phonebookSlice';
import phonebookReducer from './phonebookSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    phonebook: phonebookReducer,
  },
});
