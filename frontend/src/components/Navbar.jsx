import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.user); // adjust based on your slice

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userblogtoken'); // clear token if stored
    navigate('/login');
  };

  const token = localStorage.getItem('userblogtoken');

  return (
     <nav className="p-4" style={{ backgroundColor: '#3A506B' }}>
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          MyBlog
        </h1>

        <div className="text-right">
          {token ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-white text-[#3A506B] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
              <p className="text-white mt-1 text-sm">
                Welcome, <span className="font-semibold">{authUser?.fullName}</span>
              </p>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-[#3A506B] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
