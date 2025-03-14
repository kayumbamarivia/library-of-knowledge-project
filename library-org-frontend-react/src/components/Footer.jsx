import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 text-sm">
              LOK@J88 is dedicated to creating innovative solutions for library management.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-indigo-400">Home</Link>
              </li>
              <li>
                <Link to="/users" className="text-gray-300 hover:text-indigo-400">Users</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-indigo-400">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-indigo-400">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <form className="flex items-center space-x-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-full w-full text-gray-800"
              />
              <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-200">
                <FaEnvelope size={20} />
              </button>
            </form>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">For inquiries or support, feel free to reach out.</p>
            <ul className="space-y-2 mt-4 text-sm">
              <li className="text-gray-300">
                <a href="mailto:info@lokj88.com" className="hover:text-indigo-400">info@lokj88.com</a>
              </li>
              <li className="text-gray-300">
                <a href="tel:+1234567890" className="hover:text-indigo-400">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} LOK@J88. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
