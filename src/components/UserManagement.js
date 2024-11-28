import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/UserManagement.css"; // Correct path to UserManagement.css in pages folder

function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");

        // Log the raw response to see if it's HTML (error page) or JSON
        const text = await response.text();
        console.log('Response:', text); // Log response for debugging

        // If the response is ok, parse it as JSON
        if (response.ok) {
          const data = JSON.parse(text); // Parse as JSON
          setUsers(data.users); // Update the users state with the data from the response
        } else {
          console.error("Failed to fetch users", text); // Log error message if response is not ok
        }
      } catch (error) {
        console.error("Error fetching users:", error); // Log any errors during the fetch process
      }
    };

    fetchUsers(); // Call the function to fetch users when the component mounts
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const toggleBlock = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, blocked: !user.blocked } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <button onClick={() => navigate("/")}>Go to Login</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Seen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastSeen}</td>
                <td>
                  <button onClick={() => toggleBlock(user.id)}>
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
