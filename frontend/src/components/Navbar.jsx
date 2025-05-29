import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // example logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming you store user info here

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="p-4" style={{ backgroundColor: '#3A506B' }}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MyBlog</h1>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-[#3A506B] font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                // redirect to login page, e.g. using react-router
                window.location.href = '/login';
              }}
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
