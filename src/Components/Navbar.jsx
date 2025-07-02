import React, { useState, useEffect } from 'react';
import { Shield, BarChart, Clock, User, LogOut, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({ name: '', username: '', email: '' });
    const navigate = useNavigate();

    const navLinks = [
        { name: "Dashboard", icon: <Shield size={26} strokeWidth={1.2} />, link: "/dashboard", showName: true },
        { name: "Threat Analysis", icon: <BarChart size={26} strokeWidth={1.2} />, link: "/threat-analysis", showName: true },
        { name: "Reports History", icon: <Clock size={26} strokeWidth={1.2} />, link: "/reports-history", showName: true },
    ];

    const handleLogout = () => {
        setShowConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
        window.location.reload();
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex flex-col justify-between w-60 h-screen px-3 py-8 bg-[#FDFDFD]">
            <div className="flex flex-col mt-32 mb-32">
                <img src="../../Assets/Logo3.png" alt="Logo" className="w-40 mx-auto mb-20" />

                <div className="flex flex-col ml-5 space-y-10">
                    {navLinks.map((item, index) => (
                        <a key={index} href={item.link} className="hover:text-gray-800 flex items-center text-black transition-all">
                            {item.icon}
                            <span className="ml-3 text-sm font-medium">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
            <hr className="text-slate-400" />
            <div className="relative flex items-center justify-center space-x-6">
                <div className="relative">
                    <a
                        className="Profile hover:text-gray-800 flex items-center text-black transition-all cursor-pointer"
                        onClick={() => setShowProfilePopup(!showProfilePopup)}
                    >
                        <User size={26} strokeWidth={1.2} />
                    </a>

                    {showProfilePopup && (
                        <div className="-top-40 left-1/2 rounded-xl w-80 absolute z-50 p-4 -translate-x-20 bg-white border border-gray-300 shadow-lg">
                            <h3 className="mb-3 text-lg font-bold text-center text-black">{userData.name}</h3>

                            <div className="flex items-center mb-2 text-sm text-gray-700">
                                <User size={16} className="mr-2 text-gray-600" />
                                {userData.username}
                            </div>

                            <div className="flex items-center mb-2 text-sm text-gray-700">
                                <Mail size={16} className="mr-2 text-gray-600" />
                                {userData.email}
                            </div>

                            <div className="flex items-center justify-between pt-2 mt-2 text-sm text-gray-700 border-t">
                                <div className="flex items-center">
                                    <Eye size={16} className="mr-2 text-gray-600" />
                                    <span>{showPassword ? userData.password : '••••••••'}</span>
                                </div>
                                <button onClick={() => setShowPassword(!showPassword)} className="hover:text-black text-gray-600">
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    className="hover:text-gray-800 flex items-center text-black transition-all"
                >
                    <LogOut size={26} strokeWidth={1.2} />
                </button>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-80 p-6 text-center bg-white rounded-lg shadow-lg">
                        <p className="text-slate-700 mb-4 text-lg font-semibold">Are you sure you want to logout?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="hover:bg-gray-100 px-4 py-2 text-gray-600 border border-gray-400 rounded-md"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="hover:bg-[#3bd17c] px-4 py-2 text-white bg-[#01FF70] rounded-md"
                                onClick={confirmLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
