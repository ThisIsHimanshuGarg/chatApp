import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    email: "",
    password: ""
  });

  // store input data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const port= import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${port}/api/login`,
        formData
      );
     const token = response.data.token
      localStorage.setItem("token", token);
      localStorage.setItem("user" ,JSON.stringify(response.data.data))

    toast.success(response.data.message);


      setFormData({
        email: "",
        password: ""
      });

        navigate("/chat")

    } catch (error) {

      setFormData({
        email: "",
        password: ""
      });

      toast.error(error.response.data.message);
    }
    finally {

      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-200 min-h-screen">

      {/* Top Section */}
      <div className="bg-[#0b6157] h-25 flex flex-col items-center justify-center">

        {/* Logo */}
        <div className="w-11 h-11 rounded-full bg-teal-700 flex items-center justify-center mt-2">
          <img src="https://cdn-icons-png.flaticon.com/128/4564/4564089.png" className="text-white text-2xl w-6 h-6" />
        </div>

        <h1 className="text-white text-2xl font-bold mt-0">
          ChatApp
        </h1>
      </div>

      {/* Login Card */}
      <div className="flex justify-center -mt-50 px-4 py-6">

        <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-md">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back
          </h2>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

          {/* Form */}
          <form className="mt-4 space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-600 font-semibold mb-2">
                EMAIL
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl h-12 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0b6157]"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-gray-600 font-semibold mb-2">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="********"
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl h-12 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0b6157]"
                required
              />
            </div>


            {/* Button */}
            <button
              className="w-full flex justify-center items-center bg-[#0b6157] text-white py-3 rounded-full text-lg font-semibold hover:bg-teal-900 transition" type="submit"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-gray-500 mt-6">
            Don't have an account?
            <Link className="text-[#0b6157] font-semibold cursor-pointer ml-1 no-underline" to="/">
              Sign up
            </Link>
          </p>

          {/* Google Button */}
          <button
            className="w-full border border-gray-300 mt-3 py-3  rounded-full flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-6 h-6"
            />

            <span className="text-gray-700 font-semibold">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
