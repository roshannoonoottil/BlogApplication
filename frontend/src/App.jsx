import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/Home';
import UserHome from './pages/UserHome';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import EditBlogPage from './pages/EditBlogPage';
import Navbar from './components/Navbar';

function App() {

 return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/create" element={<CreateBlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/edit/:id" element={<EditBlogPage />} />
    </Routes>
    </>
  );
}

export default App
