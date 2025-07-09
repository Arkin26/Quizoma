import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);

      // Optional: Redirect to dashboard or home
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-6xl shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left side - Form */}
        <div className="w-1/2 p-10">
          <h1 className="text-4xl font-bold mb-2">Hey there !</h1>
          <p className="text-sm text-gray-500 mb-8">
            Sign up to create your quiz world
          </p>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
              placeholder="Create password"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="bg-[#5E54C7] text-white py-3 rounded hover:bg-purple-700 transition">
              Sign Up
            </button>
          </form>

          <p className="text-sm mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5E54C7] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
          <img src="./login.png" alt="Signup illustration" className="max-w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}
