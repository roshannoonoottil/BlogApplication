import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../api/blogAPI';
import { setBlogs } from '../redux/slices/blogSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

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

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDE7] to-[#FFF9C4] p-6">
  {/* Header Section */}
  <div className="text-center mb-10">
    <h1 className="text-5xl font-bold text-[#5D5D6D] mb-2">📝 Infinity Blog</h1>
    <p className="text-gray-600 text-lg">Explore insightful thoughts, stories, and ideas.</p>
  </div>

  {/* Blog Cards or No Blogs */}
  {blogs.length === 0 ? (
    <div className="text-center text-gray-700 text-lg mt-20">
      <span className="text-4xl">📭</span>
      <p className="mt-2">No blogs available. Be the first to post!</p>
    </div>
  ) : (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {currentBlogs.map((blog) => (
          <div
            key={blog.blogId}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 border-l-4 border-[#6D6D7A] transition-shadow duration-300"
          >
            <div className="flex items-center mb-2">
              {/* Avatar Circle */}
              <div className="w-9 h-9 bg-[#6D6D7A] text-white flex items-center justify-center rounded-full font-bold text-sm mr-3">
                {blog.author?.[0]?.toUpperCase()}
              </div>
              <p className="text-sm text-gray-700 font-medium">By {blog.author}</p>
            </div>

            <h2 className="text-2xl font-semibold text-[#6D6D7A] mb-2">{blog.title}</h2>
            <p className="text-[#333] mb-3 text-sm line-clamp-3">
              {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(`/publicblog/${blog.blogId}`)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Read More →
              </button>
              <p className="text-xs text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#E0E0E0] rounded hover:bg-[#d4d4d4] disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#E0E0E0] rounded hover:bg-[#d4d4d4] disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </>
  )}
</div>

  );
};

export default Home;
