import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import cover from '../assets/cover2.png';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if the user is already logged in
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // If token exists, clear it and dispatch logout action
      sessionStorage.removeItem('token');
      dispatch(signInFailure('Logged out'));
      navigate('/sign-in');
    }
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:2000/v1/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        dispatch(signInFailure(data.message));
        return;
      }

      const data = await res.json();
      sessionStorage.setItem('token', data.data[0]);
      console.log(data.data[1]);

      dispatch(signInSuccess(data.data[1]));
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="bg-white p-8 max-w-lg mx-auto rounded-lg shadow-xl opacity-90 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
            id="email"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 pr-12 transition duration-300 ease-in-out"
              id="password"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-900 via-purple-950 to-pink-950 text-white p-4 rounded-lg uppercase font-semibold transform transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 disabled:bg-purple-300 disabled:opacity-70"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className="flex justify-center gap-2 mt-4 text-gray-700">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-600 hover:underline">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
