import API from '../api/axios';

export const createBlog = async (blogData) => {
  const token = localStorage.getItem('userblogtoken');
  const res = await API.post('/user/create', blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateBlog = async (id, updatedData) => {
  const token = localStorage.getItem('userblogtoken');
  const res = await API.put(`/user/edit/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const deleteBlog = async (id) => {
  const res = await API.delete(`/user/delete/${id}`);
  return res.data;
};

export const fetchAllBlogs = async () => {
  const res = await API.get('/user/home');
  return res.data;
};