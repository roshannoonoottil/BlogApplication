import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import EditBlogPage from './pages/EditBlogPage';

function App() {

 return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/create" element={<CreateBlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/edit/:id" element={<EditBlogPage />} />
    </Routes>
  );
}

export default App
