
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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



    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(formData.password)) {

      toast.error(
        "Password not valid"
      );

      return; // IMPORTANT
    }

    try {
       const port=import.meta.env.VITE_API_URL;

      setLoading(true);
      const response = await axios.post(
        `${port}/api/signup`,
        formData
      );
      toast.success(response.data.message);


      setFormData({
        name: "",
        email: "",
        password: ""
      });
      navigate("/login")

    } catch (error) {

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      toast.error(error.response.data.message);

    }
    finally {

      setLoading(false);
    }
  };




  // password

  const [error, setError] = useState("");


  const handlePassword = (e) => {

    const value = e.target.value;

    setFormData({
      ...formData,
      password: value
    });

    const uppercase = /[A-Z]/;
    const specialChar = /[!@#$%^&*]/;

    if (value === "") {
      setError("");
    }

    else if (value.length < 8) {
      setError("Password must be at least 8 characters");
    }

    else if (!uppercase.test(value)) {
      setError("Password must contain one uppercase letter");
    }

    else if (!specialChar.test(value)) {
      setError("Password must contain one special symbol");
    }

    else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Header */}
      <div className="bg-[#0b6157] h-24 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-200 mt-0">Join ChatApp today</p>
      </div>

      {/* Form Card */}
      <div className="flex justify-center mt-6 mb-8 px-4">
        <div className="bg-white shadow-lg rounded-md w-full max-w-md px-6 py-6">

          {/* Full Name */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-2">
              <label className="block text-gray-600 font-semibold mb-2">
                FULL NAME
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl h-12 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0b6157]"
                required
              />
            </div>

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
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handlePassword(e);
                  handleChange(e);
                }}
                className="w-full border border-gray-300 rounded-xl h-12 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0b6157]"
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}

            </div>

            {/* Button */}

            <button className="w-full flex justify-center items-center bg-[#0b6157] text-white py-3 rounded-full h-13 text-lg font-semibold hover:bg-[#094d45] transition " type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
             </form>
            {/* Sign In */}

            <p className="text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link className="text-[#0b6157] font-semibold cursor-pointer no-underline" to="/login">
                Sign in
              </Link>
            </p>
            {/* Google Button */}

            <button className="w-full border border-gray-300 py-3 rounded-full mt-6 mb-2 flex items-center justify-center gap-3 hover:bg-gray-50">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="google"
                className="w-5 h-5"
              />

              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;