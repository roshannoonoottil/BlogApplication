import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/Home';
import UserHome from './pages/UserHome';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import Navbar from './components/Navbar';
import PublicBlogPage from './pages/PublicBlogPage';

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
      <Route path="/singleblog/:id" element={<BlogDetailsPage />} />
      <Route path="/publicblog/:id" element={<PublicBlogPage />} />
      <Route path="/edit/:id" element={<CreateBlogPage />} />
    </Routes>
    </>
  );
}

export default App
