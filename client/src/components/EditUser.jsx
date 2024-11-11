import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams(); // Get userId from URL parameters
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      <h2>Edit User</h2>
      {user && (
        // Form to edit user details, populated with user data
        <form>
          <label>Name:</label>
          <input type="text" value={user.name} onChange={(e) => {/* handle change */}} />
          {/* Add other fields and handle form submission */}
        </form>
      )}
    </div>
  );
};

export default EditUser;
