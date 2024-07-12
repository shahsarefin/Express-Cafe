import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const CoffeeCard = ({ coffee }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${coffee.name}?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5001/coffee/${coffee._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload(); 
        } else {
          console.error('Failed to delete coffee');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl flex">
      <figure className="w-1/3">
        <img src={coffee.photo} alt={coffee.name} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body w-2/3">
        <h2 className="card-title">{coffee.name}</h2>
        <p>{coffee.details}</p>
        <p><strong>Quantity:</strong> {coffee.quantity}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <FaEye />
          </button>
          <Link to={`/update-coffee/${coffee._id}`} className="btn btn-warning">
            <FaEdit />
          </Link>
          <button className="btn btn-error" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
