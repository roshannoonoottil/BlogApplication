import API from '../api/axios';

export const loginUser = async (credentials) => {
  const res = await API.post('/user/login', credentials);
  
  if (!res.data.success) {
    throw new Error(res.data.message || 'Login failed');
  }
  return {
    ...res.data.data,  // userId, fullName, email, createdAt
    token: res.data.token,
  };
};

export const registerUser = async (userData) => {
  const res = await API.post('/user/signup', userData);
  return res.data;
};