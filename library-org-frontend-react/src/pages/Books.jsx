import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Users() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get("http://localhost:2000/v1/api/books", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBooks(response.data.flat());
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Beautiful List of Books</h1>
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Image</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100">
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.description}</td>
                  <td className="p-3">
                    <img
                      className="rounded-full h-12 w-12 object-cover"
                      src={book.coverImage}
                      alt="book cover"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <div className="flex gap-2">
            <p>Want to create a Book?</p>
            <Link to="/new">
              <span className="text-blue-700 font-semibold hover:underline">Add</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
