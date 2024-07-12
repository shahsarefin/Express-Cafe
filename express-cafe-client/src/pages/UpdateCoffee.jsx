import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCoffee = () => {
  const { id } = useParams(); // Get the coffee ID from the URL parameters
  const navigate = useNavigate(); // Used to navigate to different routes
  const [coffee, setCoffee] = useState({
    name: '',
    quantity: '',
    details: '',
    photo: ''
  });

  // Fetch the coffee details when the component mounts
  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const response = await fetch(`http://localhost:5001/coffee/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCoffee(data); // Update state with fetched coffee data
        } else {
          console.error('Failed to fetch coffee data');
        }
      } catch (error) {
        console.error('Error fetching coffee:', error);
      }
    };

    fetchCoffee();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const details = form.details.value;
    const photo = form.photo.value;

    const updatedCoffee = { name, quantity, details, photo };

    console.log('Updated Coffee Data:', updatedCoffee);

    // Send the updated coffee data to the server
    try {
      const response = await fetch(`http://localhost:5001/coffee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCoffee),
      });

      if (response.ok) {
        alert('Coffee updated successfully');
        navigate('/'); // Navigate back to the home page
      } else {
        alert('Failed to update coffee');
      }
    } catch (error) {
      console.error('Error updating coffee:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center fancy-font">Update Coffee</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Coffee Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            defaultValue={coffee.name}
            required
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="quantity">
            <span className="label-text">Available Quantity</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="input input-bordered w-full"
            defaultValue={coffee.quantity}
            required
          />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label" htmlFor="details">
            <span className="label-text">Details</span>
          </label>
          <textarea
            id="details"
            name="details"
            className="textarea textarea-bordered w-full"
            defaultValue={coffee.details}
            required
          />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label" htmlFor="photo">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="url"
            id="photo"
            name="photo"
            className="input input-bordered w-full"
            defaultValue={coffee.photo}
          />
        </div>
        <div className="form-control md:col-span-2">
          <button type="submit" className="btn bg-brown-700 text-white w-full">
            Update Coffee
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCoffee;
