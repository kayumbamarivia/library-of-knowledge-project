import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import cover from '../assets/cover2.png';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:2000/v1/api/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(res.data);
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${cover})` }}>
      <div className="bg-white p-8 max-w-lg mx-auto rounded-lg shadow-2xl opacity-95 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6 text-shadow-md animate__animated animate__fadeIn">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
            id="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
            id="email"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pr-12 transition duration-300 ease-in-out"
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
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className="flex justify-center gap-2 mt-4 text-gray-700">
          <p>Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-blue-600 hover:underline">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}