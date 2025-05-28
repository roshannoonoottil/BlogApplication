import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Update to your backend base URL
});

// Attach token to every request if available
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
