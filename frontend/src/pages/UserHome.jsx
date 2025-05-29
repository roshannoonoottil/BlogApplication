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
    <div className="p-6 bg-[#FFF9C4]">
      <h1 className="text-2xl font-bold mb-4">Your Posts</h1>

      {userBlogs.length === 0 ? (
        <p>You haven't created any blogs yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentBlogs.map((blog) => (
              <div key={blog.blogId} className="border p-4 rounded-lg shadow bg-white">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 text-sm mb-3">
                  {blog.content.length > 100
                    ? `${blog.content.slice(0, 100)}...`
                    : blog.content}
                </p>
                <button
                  onClick={() => navigate(`/singleblog/${blog.blogId}`)}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </button>
                <p className="text-xs text-gray-500 mt-2">
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
