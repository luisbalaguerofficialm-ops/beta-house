import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import img from "../assets/rejester.png";
import good from "../assets/good.png";
import google from "../assets/google.png";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://beta-house-backend-b96p.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[400px] flex flex-row lg:flex-row">
      {/* LEFT SIDE */}
      <div className="flex-1 items-start flex flex-col justify-center px-6 py-10">
        <div className="mb-16 text-left">
          <h2 className="font-bold text-2xl mb-3">
            Join our community of home seekers and explore the possibilities
            that await.
          </h2>
          <p>Let's get started by filling out the information below</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[450px]">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleRegister}
          >
            {/* Name Fields */}
            <div className="text-left flex gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full mt-1 h-10 py-2 px-3 border border-[#C3C7CA] bg-[#FFFFFF] rounded-lg outline-none"
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full mt-1 h-10 py-2 px-3 border border-[#C3C7CA] bg-[#FFFFFF] rounded-lg outline-none"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="email" className="text-[14px] font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 h-10 py-2 px-3 border border-[#C3C7CA] bg-[#FFFFFF] rounded-lg outline-none"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="password" className="text-[14px] font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 h-10 px-3 pr-10 border border-[#C3C7CA] outline-none bg-transparent rounded-lg"
                required
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1 text-left">
              <label
                htmlFor="confirmPassword"
                className="text-[14px] font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="*********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-2 h-10 px-3 pr-10 border border-[#C3C7CA] outline-none bg-transparent rounded-lg"
                required
                disabled={loading}
              />
            </div>

            {/* Terms */}
            <div className="flex gap-3 mb-4">
              <img src={good} alt="" className="w-5 h-5" />
              <p>I agree to Terms of Service and Privacy Policies</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 h-10 px-3 pr-10 border mb-2 bg-[#3D9970] border-[#3D9970] text-white rounded-lg"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 relative">
        <img src={img} alt="" className="min-h-screen w-[700px] object-cover" />
        <div className="absolute bottom-22 left-26 backdrop-blur-xs text-[#FFFFFF] p-4 text-[16px] leading-9 max-w-[400px] rounded-lg">
          <p className="font-bold">Sarutobi .H</p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Register;
