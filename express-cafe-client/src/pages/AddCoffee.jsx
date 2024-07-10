import React from 'react';

const AddCoffee = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const quantity = form.quantity.value;
    const details = form.details.value;
    const photo = form.photo.value;

    const newCoffee = { name, quantity, details, photo };

    console.log('Coffee Data:', newCoffee);

    // Send the new coffee data to the server
    try {
      // Send the data to the server using a POST request
      const response = await fetch('http://localhost:5001/coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoffee), // Convert the coffee data object to a JSON string
      });

      // Check if the request was successful
      if (response.ok) {
        alert('Coffee added successfully'); // Display a success message
        form.reset(); // Reset the form fields
      } else {
        alert('Failed to add coffee'); // Display an error message if the request failed
      }
    } catch (error) {
      console.error('Error adding coffee:', error);
      alert('An error occurred'); // Display an error message if an exception was caught
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center fancy-font">Add New Coffee</h1>
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
          />
        </div>
        <div className="form-control md:col-span-2">
          <button type="submit" className="btn bg-brown-700 text-white w-full">
            Add Coffee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCoffee;
