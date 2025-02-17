import React, { useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brown-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center text-brown-800">Welcome to Express Cafe</h1>
        <h2 className="text-xl font-semibold text-center text-brown-600">Sign In to Your Account</h2>
        {error && <p className="text-red-500">{error}</p>}
        {currentUser && <p className="text-green-500">You are already logged in as {currentUser.email}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-brown-700">Email:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-brown-700">Password:</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full bg-brown-700 hover:bg-brown-800">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
