import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user._id} className="p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold">{user.email}</h2>
            <p>UID: {user.uid}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
