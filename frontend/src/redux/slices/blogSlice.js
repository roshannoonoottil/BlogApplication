import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.findIndex(blog => blog._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog._id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;