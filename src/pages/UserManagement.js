import React, { useState } from "react";
import "./UserManagement.css"; // Custom styles

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", lastSeen: "2024-11-28", blocked: false },
    { id: 2, name: "Jane Doe", email: "jane@example.com", lastSeen: "2024-11-27", blocked: false },
    // More users...
  ]);

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
          {users.map(user => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
