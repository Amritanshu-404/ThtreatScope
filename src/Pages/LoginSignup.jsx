import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";

const LoginSignup = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        company: "",
        occupation: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/signup", formData);
            toast.success("Signup successful! You can now login. 🥳");
            setShowLogin(true);
            setFormData({ username: "", email: "", company: "", occupation: "", password: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 200) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful! 🥳");
                setTimeout(() => {
                    window.location.reload();
                    navigate(`/dashboard`);
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Check credentials.");
        }

        setFormData({ ...formData, password: "" });
    };

    return (
        <div className="LoginSignup flex justify-center w-full min-h-screen py-16">
            <ToastContainer />

            {showForgotPassword && (
                <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
            )}

            <div className="LoginSingup bg-[#f8f9fa] rounded-3xl shadow-[#dee2e6] items-center w-3/4 shadow-2xl grid grid-cols-2">
                <div className="Image">
                    <img src="../../Assets/Login2.png" alt="LoginPic" />
                </div>
                <div className="flex flex-col mr-20">
                    <img src="../../Assets/Logo3.png" className="w-3/5 mb-3 ml-32" />
                    <h2 className="mb-14 text-md text-right font-[Sigmar]">
                        {showLogin ? " - Safeguard Your Digital World" : "- Start Your Journey to Security"}
                    </h2>
                    <form onSubmit={showLogin ? handleLogin : handleSignup}>

                        {!showLogin && (
                            <>
                                <div className="gap-x-4 flex">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company (Optional)"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="occupation"
                                    placeholder="Occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="right-3 top-3 absolute cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {showLogin && (
                            <p className="text-slate-600 font-Popins mb-4 font-medium text-center cursor-pointer"
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Forgot Password?
                            </p>
                        )}

                        <button type="submit" className="hover:bg-[#3bd17c] w-full py-3 text-white bg-[#01FF70] rounded">
                            {showLogin ? "Login" : "Sign Up"}
                        </button>
                    </form>
                    <p className="mt-4 text-center cursor-pointer" onClick={() => setShowLogin(!showLogin)}>
                        {showLogin ? "Don't Have an Account ? Sign Up" : "Already have an account ? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
