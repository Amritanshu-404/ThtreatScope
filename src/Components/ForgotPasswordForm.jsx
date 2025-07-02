import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

const ForgotPasswordForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/forgot-password", {
                email,
                username,
                newPassword,
            });
            toast.success("Password reset successful! 🥳");
            onClose();
        } catch (error) {
            console.error("Error:", error.response.data);
            toast.error(error.response.data.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="w-96 relative p-8 bg-white rounded-lg shadow-lg">
                <button className="top-4 right-4 absolute text-gray-600" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className="mb-4 text-2xl font-bold">Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-slate-600 block font-bold">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-slate-600 block font-bold">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="text-slate-600 block font-bold">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded"
                                required
                            />
                            <button
                                type="button"
                                className="top-3 right-3 absolute text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="px-4 py-2 text-white bg-[#191919] rounded-md">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
