import API from '../api/axios';

export const loginUser = async (credentials) => {
  const res = await API.post('/user/login', credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await API.post('/user/signup', userData);
  return res.data;
};