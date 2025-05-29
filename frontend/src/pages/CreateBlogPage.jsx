import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlog } from '../api/blogAPI'; // Adjust path as needed
import axios from 'axios';

function BlogFormPage() {
  const { id } = useParams(); // If editing, this will be defined
  const navigate = useNavigate();
  const token = localStorage.getItem('userblogtoken');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  

  // Fetch existing blog data if editing
  useEffect(() => {

        if (!token) {
      navigate('/login');
      return;
    }

    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/user/singleblog/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => {
          console.error('Error fetching blog:', err);
          alert('Failed to load blog data.');
          navigate('/userhome');
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required.');

    try {
      if (id) {
        await updateBlog(id, { title, content });
        alert('Blog updated successfully!');
      } else {
        await createBlog({ title, content });
        alert('Blog created successfully!');
      }
      navigate('/userhome');
    } catch (err) {
      console.error('Error submitting blog:', err);
      alert('Something went wrong.');
    }
  };

  const handleCancel = () => {
    navigate('/userhome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 flex justify-center items-center p-4">
  <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
      {id ? 'Edit Blog' : 'Create Blog'}
    </h2>
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
        <textarea
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition"
        >
          {id ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default BlogFormPage;
