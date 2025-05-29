import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem('userblogtoken');
  const [userBlogs, setUserBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
        navigate('/login');
      }
    };

    fetchUserBlogs();
  }, [navigate, token]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = userBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(userBlogs.length / blogsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#FFF9C4] p-6">
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold text-[#6D6D7A] text-center flex-1">Your Posts</h1>
    <button
      onClick={() => navigate('/create')}
      className="bg-[#6D6D7A] text-white px-4 py-2 rounded-lg hover:bg-[#5a5a66] transition ml-4"
    >
      + Create Blog
    </button>
  </div>

  {userBlogs.length === 0 ? (
    <p className="text-center text-gray-700">You haven't created any blogs yet.</p>
  ) : (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {currentBlogs.map((blog) => (
          <div
            key={blog.blogId}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#6D6D7A]"
          >
            <h2 className="text-2xl font-semibold text-[#6D6D7A] mb-1">{blog.title}</h2>
            <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
            <p className="text-[#333] mb-2 line-clamp-3">
              {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
            </p>
            <button
              onClick={() => navigate(`/singleblog/${blog.blogId}`)}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Read More →
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  )}
</div>

  );
}

export default UserHome;
