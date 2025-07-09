import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectPath = searchParams.get('redirect') || '/';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://quizoma-backend.onrender.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userEmail", res.data.email);

      // ✅ Redirect to the page user originally tried to visit
      navigate(redirectPath);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-6xl shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left side - Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-4xl font-bold mb-2">Holla,<br />Welcome Back</h1>
          <p className="text-sm text-gray-500 mb-8">
            Login to your special place
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="stanley@gmail.com"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="bg-[#5E54C7] text-white py-3 rounded hover:bg-purple-700 transition">
              Sign In
            </button>
          </form>

          <p className="text-sm mt-6 text-center">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-[#5E54C7] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
          <img src="./login.png" alt="Login illustration" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}
