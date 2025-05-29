import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../api/blogAPI';
import { setBlogs } from '../redux/slices/blogSlice';

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        dispatch(setBlogs(data));
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    getBlogs();
  }, [dispatch]);

  return (
<div className="min-h-screen bg-[#FFF9C4] p-6">
  <h1 className="text-4xl font-bold text-[#6D6D7A] mb-8 text-center">All Blog Posts</h1>
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {blogs.map((blog) => (
      <div key={blog.blogId} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#6D6D7A]">
        <h2 className="text-2xl font-semibold text-[#6D6D7A] mb-1">{blog.title}</h2>
        <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
        <p className="text-[#333] mb-2 line-clamp-3">{blog.content}</p>
        <p className="text-sm text-gray-500">Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default Home;
