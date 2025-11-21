import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loginImg from "../assets/login.png";
import google from "../assets/google.png";
import good from "../assets/good.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://beta-house-backend-b96p.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, photo: data.photo || "" })
        );

        toast.success("Login successful! Redirecting...");

        // Redirect to public home page after short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(data.message || "Login failed");
      }
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
        <div className="mb-8 text-left">
          <h2 className="font-bold text-2xl mb-3">
            Welcome Back to BetaHouse!
          </h2>
          <p>Let's get started by filling out the information below</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[450px]">
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
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

            {/* Remember & Forgot */}
            <div className="flex mb-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={good} alt="" className="w-5 h-5" />
                <p>Remember Me</p>
              </div>
              <button
                type="button"
                className="font-bold text-[#EC5E5E] underline"
              >
                Forgot Password
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 h-10 px-3 pr-10 border mb-2 bg-[#3D9970] border-[#3D9970] text-white rounded-lg"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* OR separator */}
            <div className="flex items-center w-full gap-4 mb-4">
              <div className="flex-1 border-b border-gray-400"></div>
              <span className="text-gray-500">OR</span>
              <div className="flex-1 border-b border-gray-400"></div>
            </div>

            {/* Google Login */}
            <button className="w-full h-10 px-3 flex items-center justify-center gap-2 border mb-4 bg-gray-100 border-gray-400 text-black rounded-lg">
              <img src={google} alt="Google Logo" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            {/* Signup link */}
            <p className="text-center font-medium text-[14px] text-[#000000]">
              New User?{" "}
              <button
                className="font-bold text-[#3D9970] underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src={loginImg}
          alt=""
          className="min-h-screen w-[700px] object-cover"
        />
        <div className="absolute bottom-22 left-26 backdrop-blur-xs text-[#FFFFFF] p-4 text-[16px] leading-9 max-w-[400px] rounded-lg">
          <p className="font-bold">Sarutobi .H</p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
