import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await axios.post(
      'https://connections-api.herokuapp.com/users/logout',
      null,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    try {
      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.email = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
      });
  },
});

export default userSlice.reducer;
