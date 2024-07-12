import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CoffeeCard from '../components/CoffeeCard';

const Home = () => {
  const coffees = useLoaderData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Coffee Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee._id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default Home;
