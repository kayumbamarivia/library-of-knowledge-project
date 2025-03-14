import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';

export default function Users() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    Load();
  }, []);
  
  async function Load() {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get("http://localhost:2000/v1/api/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data.flat());
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
  return (
    <div className="flex">
      <SideBar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Meet Our Amazing Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="border p-4 text-left text-sm font-semibold">Name</th>
              <th className="border p-4 text-left text-sm font-semibold">Email</th>
              <th className="border p-4 text-left text-sm font-semibold">Profile Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-gray-50 hover:bg-indigo-100 transition-all duration-200">
                <td className="border p-4 text-gray-800">{user.name}</td>
                <td className="border p-4 text-gray-800">{user.email}</td>
                <td className="border p-4">
                  <img
                    className="rounded-full h-12 w-12 object-cover"
                    src={user.avatar}
                    alt="profile"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
