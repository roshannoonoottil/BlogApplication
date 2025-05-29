import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../api/authAPI';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Validation Functions ---
  const validateFullName = () => {
    const { fullName } = formData;
    if (!fullName.trim()) {
      return 'Full name is required';
    }
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)+$/;
    if (!nameRegex.test(fullName.trim())) {
      return 'Please enter your full name';
    }
    return '';
  };

  const validateEmail = () => {
    const { email } = formData;
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[A-Za-z\._\-\d]+@[A-Za-z]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = () => {
    const { password } = formData;
    if (!password.trim()) {
      return 'Password is required';
    }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return 'Password must be 8+ chars with upper, lower, number & special char';
    }
    return '';
  };

  const validateConfirmPassword = () => {
    const { password, confirmPassword } = formData;
    if (!confirmPassword.trim()) {
      return 'Confirm Password is required';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validate = () => {
    const newErrors = {};
    const fullNameError = validateFullName();
    const emailError = validateEmail();
    const passwordError = validatePassword();
    const confirmPasswordError = validateConfirmPassword();

    if (fullNameError) newErrors.fullName = fullNameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { confirmPassword, ...submitData } = formData; // exclude confirmPassword
      await registerUser(submitData);
      toast.success('Signup successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF9C4]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#3A506B] mb-6">Sign Up</h2>

        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md pr-10"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md pr-10"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#3A506B] text-white py-2 rounded-md hover:bg-[#2c3e50] transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>

      <ToastContainer autoClose={4000} pauseOnHover />
    </div>
  );
};

export default SignupPage;
