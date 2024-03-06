import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'phonebook/fetchContacts',
  async (_, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const response = await fetch(
      'https://connections-api.herokuapp.com/contacts',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const addNewContact = createAsyncThunk(
  'phonebook/addNewContact',
  async contact => {
    const response = await fetch(
      'https://connections-api.herokuapp.com/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteExistingContact = createAsyncThunk(
  'phonebook/deleteExistingContact',
  async contactId => {
    await fetch(`https://connections-api.herokuapp.com/contacts/${contactId}`, {
      method: 'DELETE',
    });
    return contactId;
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
