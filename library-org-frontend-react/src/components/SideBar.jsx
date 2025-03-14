import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaUsers, FaPlus, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

export default function SideBar() {
  return (
    <div className="flex flex-col bg-indigo-800 text-white w-64 h-screen p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Library</h2>
      <nav className="space-y-4">
        <Link to="/home" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaHome size={20} /> <span>Home</span>
        </Link>
        <Link to="/users" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaUsers size={20} /> <span>Users</span>
        </Link>
        <Link to="/home" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaBook size={20} /> <span>Books</span>
        </Link>
        <Link to="/new" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaPlus size={20} /> <span>Add Book</span>
        </Link>
        <Link to="/profile" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaUserAlt size={20} /> <span>Profile</span>
        </Link>
        <Link to="/profile" className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded-lg">
          <FaSignOutAlt size={20} /> <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
}
