import img from "../assets/fire pit2.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // React Router's navigate hook

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("User registered successfully!");
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        navigate("/products"); // Redirect to homepage
      } else {
        alert("Failed to register user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[800px] border border-gray-400 bg-white rounded-md overflow-hidden shadow-md"
      >
        <div className="flex gap-3 w-full">
          {/* Left Section: Form */}
          <div className="w-1/2 flex flex-col gap-3 p-6">
            <h3 className="font-semibold text-2xl text-center">Sign Up</h3>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="text-sm text-gray-800">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-sm text-gray-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm text-gray-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm text-gray-800">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="py-2 mt-3 rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-300 hover:opacity-90"
            >
              Sign Up
            </button>

            {/* Social Media Links */}
            <span className="text-gray-500 text-sm text-center mt-4">
              Or Sign Up with
            </span>
            <div className="w-full flex gap-4 text-lg justify-center text-white mt-2">
              <a
                href="#"
                className="p-3 bg-blue-600 rounded-full hover:scale-110 transition-transform duration-200"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="p-3 bg-black rounded-full hover:scale-110 transition-transform duration-200"
              >
                <FaXTwitter />
              </a>
            </div>

            {/* Sign In Link */}
            <div className="text-sm text-center mt-3">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Sign in now
              </NavLink>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="w-1/2 h-full">
            <img
              src={img}
              alt="Sign Up"
              className="w-full h-full object-cover rounded-r-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
