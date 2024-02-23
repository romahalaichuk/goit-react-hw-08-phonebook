import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'phonebook/fetchContacts',
  async () => {
    try {
      const response = await axios.get(
        'https://65d4c1303f1ab8c63435ed3e.mockapi.io/api/v1/contacts'
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewContact = createAsyncThunk(
  'phonebook/addNewContact',
  async contact => {
    try {
      const response = await axios.post(
        'https://65d4c1303f1ab8c63435ed3e.mockapi.io/api/v1/contacts',
        contact
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteExistingContact = createAsyncThunk(
  'phonebook/deleteExistingContact',
  async contactId => {
    try {
      await axios.delete(
        `https://65d4c1303f1ab8c63435ed3e.mockapi.io/api/v1/contacts/${contactId}`
      );
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
    filter: '',
  },
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts.push(action.payload);
      })
      .addCase(deleteExistingContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilterValue } = phonebookSlice.actions;

export default phonebookSlice.reducer;
