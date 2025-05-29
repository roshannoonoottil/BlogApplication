import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function PublicBlogPage() {
  const { id } = useParams(); // Blog ID from route
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://infinityblog.onrender.com/user/publicblog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        // Redirect or show message if blog not found
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-6 text-center text-red-500">Blog not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

      <div className="mt-6 text-sm text-gray-500">
        <p><strong>Published:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default PublicBlogPage;
