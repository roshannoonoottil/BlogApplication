import axios from 'axios';

const API = axios.create({
  baseURL: 'https://infinityblog.onrender.com', // Update this if you deploy later
});

// Attach token to every request if stored in localStorage
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;