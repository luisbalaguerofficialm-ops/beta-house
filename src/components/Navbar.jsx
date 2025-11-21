import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";
import { IoPersonCircle } from "react-icons/io5";
import AuthDropdown from "./AuthDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Listen to localStorage changes (login/logout from other pages)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Properties", path: "/properties" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50  backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 md:py-5">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "hover:text-green-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              ) : (
                <IoPersonCircle
                  size={40}
                  className="cursor-pointer text-gray-300"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              )}

              {showDropdown && (
                <AuthDropdown user={user} onLogout={handleLogout} />
              )}
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="border border-white w-20 h-8 flex items-center justify-center rounded-md text-white hover:bg-white hover:text-black transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="bg-green-600 rounded-lg w-20 h-8 flex items-center justify-center text-white border border-green-500 hover:bg-green-700 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full px-6 py-4 bg-black/90 text-white">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-green-500"
              >
                {link.name}
              </NavLink>
            ))}

            <div className="mt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        className="w-10 h-10 rounded-full border"
                        alt="profile"
                      />
                    ) : (
                      <IoPersonCircle size={40} className="text-gray-300" />
                    )}
                    <p className="text-white">{user.name}</p>
                  </div>

                  <button
                    className="mt-3 bg-red-500 w-full py-2 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="border border-white w-full h-10 flex items-center justify-center rounded-md"
                  >
                    Sign Up
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="bg-green-600 mt-2 w-full h-10 flex items-center justify-center rounded-md"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
