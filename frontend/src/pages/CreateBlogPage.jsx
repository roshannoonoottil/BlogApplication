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
    <div className="min-h-screen bg-[#FFF9C4] flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-[#6D6D7A] mb-6 text-center">
          {id ? 'Edit Blog' : 'Create Blog'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-48"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#6D6D7A] hover:bg-[#5a5a66] text-white px-6 py-2 rounded"
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
