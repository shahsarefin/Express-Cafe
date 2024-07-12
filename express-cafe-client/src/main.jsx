import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import AddCoffee from './pages/AddCoffee';
import UpdateCoffee from './pages/UpdateCoffee';
import './index.css';

// Loader function to fetch coffee data
const coffeeLoader = async () => {
  const response = await fetch('http://localhost:5001/coffees');
  if (!response.ok) {
    throw new Error('Failed to fetch coffee data');
  }
  return response.json();
};

// Define the routes with the loader
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} loader={coffeeLoader} />
      <Route path="add-coffee" element={<AddCoffee />} />
      <Route path="update-coffee" element={<UpdateCoffee />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
