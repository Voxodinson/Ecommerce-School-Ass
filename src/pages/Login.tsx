import { useState } from "react";
import img from "../assets/home decor idea.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const user = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login Successful!");
        navigate("/products");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <form
        className="w-[800px] h-fit border border-gray-400 bg-white rounded-md overflow-hidden shadow-md"
        onSubmit={handleLogin}
      >
        <div className="flex gap-3 w-full">
          <div className="w-1/2 flex flex-col gap-3 p-3">
            <h3 className="font-semibold text-[1.5rem] text-center">Login</h3>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label htmlFor="email" className="text-[.9rem] text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-end flex-col border-b pb-3 border-gray-400">
              <label htmlFor="password" className="w-full text-[.9rem] text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border border-gray-400 rounded-md outline-none py-2 px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <NavLink to="/forgot-password" className="text-[.7rem] text-gray-500 text-end hover:underline">
                Forget Password
              </NavLink>
            </div>
            <button
              type="submit"
              className="py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-300"
            >
              Login
            </button>
            <span className="text-gray-500 text-[.8rem] text-center">Or Login with</span>
            <div className="w-full flex gap-[1rem] text-[1.5rem] justify-center text-white">
              <a
                href=""
                className="p-[8px] bg-blue-600 rounded-full hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2"
              >
                <FaFacebook />
              </a>
              <a
                href=""
                className="p-[8px] bg-black rounded-full hover:scale-[115%] transition-all duration-200 ease-in-out hover:-translate-y-2"
              >
                <FaXTwitter />
              </a>
            </div>
            <div className="text-[.8rem] text-center mt-6">
              Don't have an account
              <NavLink to="/signup" className="text-gray-500 hover:underline block">
                Sign Up
              </NavLink>
            </div>
          </div>
          <div className="w-1/2 h-[500px]">
            <img src={img} alt="image" className="w-full h-full object-cover rounded-r-md" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
