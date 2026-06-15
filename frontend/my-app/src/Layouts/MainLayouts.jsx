import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
// vishal singh
const MainLayout = () => {
    const [contacts, setContacts] = useState([])
    const [activeTab, setActiveTab] = useState("chats")
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const user = {
        name: "Himanshu Garg",
    };
    // const contacts = [
    //     {
    //         _id: 1,
    //         fullName: "vishal singh",
    //         profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"

    //     },
    //     {
    //         _id: 2,
    //         fullName: "vishaljkj",
    //         profilePic: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"

    //     },
    //     {
    //         _id: 3,
    //         fullName: "vishal1",
    //         profilePic: ""

    //     },
    // ]
    const groups = [
        {
            _id: "1",
            groupIcon: "A",
            groupName: "MyGroup",
            participants: "1"
        }
    ]
    const fetchContacts = async () => {
        try {
            const port=import.meta.env.VITE_API_URL;
            const res = await axios.get(`${port}/api/getAllContacts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
           // console.log(res.data.data);
            setContacts(res.data.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchContacts()
    }, [])
    return (
        <div className="h-screen w-screen flex">
            {/* sidebar */}
            <div className="bg-gray-100 w-1/4 p-3">
                {/* header */}
                <div className="bg-[#0b6157] px-4 py-4 flex items-center justify-between">
                    <div className="text-white font-semibold text-lg">
                        {user.name}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-white/80 cursor-pointer text-xl ">
                            <FaPlus />
                        </div>
                        <div
                            onClick={() => navigate("/profile")}
                            className="text-white/80 cursor-pointer text-xl"
                        >
                            <CgProfile />
                        </div>

                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b justify-between border-gray-200 bg-gray-100">
                    <button
                        onClick={() => setActiveTab("chats")}
                        className={`flex-1 py-2 text-sm font-medium transition
              ${activeTab === "chats"
                                ? "text-[#075E54] border-b-2 border-[#075E54]"
                                : "text-gray-500"
                            }`}
                    >
                        Chats
                    </button>

                    <button
                        onClick={() => setActiveTab("groups")}
                        className={`flex-1 py-2 text-sm font-medium transition
              ${activeTab === "groups"
                                ? "text-[#075E54] border-b-2 border-[#075E54]"
                                : "text-gray-500"
                            }`}
                    >
                        Groups
                    </button>
                </div>

                {/* contacts */}
                <div
                    style={{
                        height: "calc(100vh - 160px)",
                        overflow: "auto",
                    }}
                >
                    {activeTab === "chats" ? (
                        <>
                            {contacts.map((c) => (
                                <div
                                    key={c._id}
                                    onClick={() => navigate(`/chat/${c._id}`)}
                                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 border-b border-gray-100"
                                >
                                    <div className="relative ">
                                        <div className="w-12 h-12 rounded-full bg-[#075E54] text-white flex items-center justify-center font-medium text-lg overflow-hidden">
                                            {c.profilePic ? (
                                                <img
                                                    src={c.profilePic}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                c.name.charAt(0)
                                            )}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-gray-900 text-sm">
                                                {c.name}
                                            </p>
                                        </div>

                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            online
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {groups.length === 0 ? (
                                <div className="text-center py-10 text-gray-400 text-sm">
                                    <p>No Group Found</p>
                                </div>
                            ) : (
                                groups.map((g) => (
                                    <div
                                        key={g._id}
                                        onClick={() => navigate(`/group/${g._id}`)}
                                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 border-b border-gray-100"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#075E54] text-white flex items-center justify-center font-medium text-lg overflow-hidden">
                                            {g.groupIcon ? (
                                                <img
                                                    src={g.groupIcon}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                g.groupName.charAt(0)
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 text-sm">
                                                {g.groupName}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {g.participants.length} members
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Right section  */}
            <div className="flex flex-col flex-1 overflow-hidden ">
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;