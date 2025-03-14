import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('search');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    const fetchListings = async () => {
      try {
        const api = `http://localhost:2000/v1/api/books/search?search=${searchTermFromUrl}`;
        const res = await axios.get(api);
        setListings(res.data);
      } catch (error) {
        console.error('Error fetching listings:', error.response?.data?.message);
      }
    };

    if (searchTermFromUrl) {
      fetchListings();
    }
  }, [location.search]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('search', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="searchTerm" className="text-lg font-semibold">
            Search Term:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full focus:outline-none transition-transform duration-300 ease-in-out"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className="bg-blue-500 text-white p-3 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none transition-transform duration-300 ease-in-out">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-gray-800 mt-5">
          Searching results:
        </h1>
        <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length === 0 && (
            <p className="text-xl text-gray-800">No book(s) found!</p>
          )}
          {listings.map((book) => (
            <div
              key={book._id || `${book.title}-${book.author}`} 
              className="border p-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              <p className="text-gray-800 font-semibold text-lg">{book.title}</p>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600 text-sm mt-2">{book.description}</p>
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-cover mt-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
