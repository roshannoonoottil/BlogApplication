import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetailsPage() {
  const { id } = useParams(); // Blog ID from route
  const navigate = useNavigate();
  const token = localStorage.getItem('userblogtoken');

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/singleblog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/userhome'); // fallback if blog not found
      }
    };

    fetchBlog();
  }, [id, navigate, token]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/userhome'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

      <div className="mt-6 text-sm text-gray-500">
        <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default BlogDetailsPage;
