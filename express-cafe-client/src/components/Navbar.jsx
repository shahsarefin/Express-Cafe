import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { auth } from '../firebase/firebase.config';

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-brown-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">Express Cafe</Link>
        <div>
          <Link to="/add-coffee" className="text-white mx-2">Add Coffee</Link>
          {!currentUser ? (
            <>
              <Link to="/sign-up" className="text-white mx-2">Sign Up</Link>
              <Link to="/sign-in" className="text-white mx-2">Sign In</Link>
            </>
          ) : (
            <>
              <span className="text-white mx-2">Welcome, {currentUser.email}</span>
              <button 
                className="text-white mx-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;