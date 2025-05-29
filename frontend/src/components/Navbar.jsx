import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.user);
  const token = localStorage.getItem('userblogtoken');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userblogtoken');
    navigate('/login');
  };

  return (
    <nav className="p-4" style={{ backgroundColor: '#3A506B' }}>
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo and Title */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/Icon.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-white text-2xl font-bold">Infinity Blog</h1>
        </div>

        {/* Right Side (Menu + Auth) */}
        <div className="flex items-center gap-4">
          {token && (
            <button
              onClick={() => navigate('/userhome')}
              className="text-white font-medium hover:text-green-500 transition"
            >
              My Blogs
            </button>
          )}

          {token ? (
            <>
                <p className="text-white mt-1 text-sm hidden sm:block">
                Welcome, <span className="font-semibold">{authUser?.fullName}</span>
              </p>
              <button
                onClick={handleLogout}
                className="bg-white text-[#3A506B] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
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
