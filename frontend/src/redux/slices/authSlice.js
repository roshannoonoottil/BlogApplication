import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    _id: '',
    fullName: '',
    email: '',
    blogs: [],
    createdAt: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
    updateUserBlogs: (state, action) => {
      state.user.blogs = action.payload;
    },
  },
});

export const { login, logout, updateUserBlogs } = authSlice.actions;
export default authSlice.reducer;