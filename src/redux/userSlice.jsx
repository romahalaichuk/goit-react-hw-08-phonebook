import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        { email, password }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, email, password }) => {
    try {
      const response = await axios.patch(
        'https://connections-api.herokuapp.com/users/current',
        { name, email, password }
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
      'https://connections-api.herokuapp.com/users/logout'
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
        'https://connections-api.herokuapp.com/users/current'
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
    user: null,
    isLoggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUserLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        console.log('Użytkownik zalogowany:', action.payload.user);
        console.log('Czy użytkownik jest zalogowany:', state.isLoggedIn);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      });
  },
});

export const { setUserLoggedIn } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
