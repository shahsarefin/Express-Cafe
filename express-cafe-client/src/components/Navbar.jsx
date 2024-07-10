import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-brown-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold fancy-font">Express Cafe</Link>
        <div>
          <Link to="/add-coffee" className="text-white mx-2">Add Coffee</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
