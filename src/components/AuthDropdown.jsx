import React from "react";
import { Link } from "react-router-dom";

const AuthDropdown = ({ user, onLogout }) => {
  return (
    <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg p-2 text-black z-50">
      <Link
        to="/profile"
        className="block py-2 px-3 hover:bg-gray-100 rounded-md"
      >
        Profile
      </Link>

      <button
        onClick={onLogout}
        className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md text-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthDropdown;
