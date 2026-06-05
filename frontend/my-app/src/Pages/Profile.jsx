
import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Profile = () => {

  const [formData, setFormData] = useState({
    name: "", email: "", profilePic: ""
  })
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  

  const fetchProfile = async () => {
    try {
      setLoading(true)
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 3000)
      // })
        const port=import.meta.env.VITE_API_URL;
      const res = await axios.get(`${port}/api/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);
      setFormData(res.data.user)

    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false)
    }
  }
  const handleUpdateProfile = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name)
      data.append("email", formData.email)
      if (selectedImage) {
        data.append("profileImage", selectedImage)
      }
      const port=import.meta.env.VITE_API_URL;
      const res = await axios.put(`${port}/api/updateProfile`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  useEffect(() => {
    fetchProfile()
  }, [])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-15 h-15 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-primary px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/chat")}
          className="text-white text-[28px]"
        >
          <IoArrowBackCircleOutline />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-primary pb-8 pt-4 flex flex-col items-center">
        <label className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer overflow-hidden mb-3">
          <span className="text-white text-3xl font-medium">H</span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>

        <p className="text-white font-medium">{formData.name}</p>
        <p className="text-white/70 text-sm">{formData.email}</p>
      </div>

      {/* Form Section */}
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#00BFA5] font-medium uppercase tracking-wide mb-3">
            Account Info
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00BFA5]"
              />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <button className="bg-primary text-white rounded-full py-3 text-sm font-medium"
            onClick={handleUpdateProfile}
          >
          Update Profile
        </button>

        {/* Logout Button */}
        <button className="bg-red-500 text-white rounded-full py-3 text-sm font-medium">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;