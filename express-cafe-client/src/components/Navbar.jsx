import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">Express Cafe</Link>
        <div>
          <Link to="/products" className="text-white mx-2">Products</Link>
          <Link to="/cart" className="text-white mx-2">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
