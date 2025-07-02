import React from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
    return (
        <footer className="flex justify-center w-full mt-5">
            <div className="w-[87%] h-[300px] p-8 mb-8 bg-[#FBFBFB] border border-[#cecece3e] rounded-lg">
                <div className="grid items-center grid-cols-2">
                    <div className="w-[60%] ml-20 leading-[25px]">
                        <img src='../../Assets/Logo3.png' alt="Logo" className="w-[40%] mb-2" />
                        <p className="font-urbanist text-gray-700">
                            At ThreatScope, we uncover hidden vulnerabilities to protect your digital world. Our proactive, privacy-first solutions are designed to keep you secure in an ever-evolving cyber landscape.
                        </p>
                    </div>

                    <div className="flex gap-12 p-8">
                        <Link to="/Login" className="font-urbanist text-gray-900 no-underline">Create Account</Link>
                        <Link to="/Blog" className="font-urbanist text-gray-900 no-underline">Blog</Link>
                        <Link to="https://thehackernews.com/" className="font-urbanist text-gray-900 no-underline">News</Link>
                        <Link to="/Contact" className="font-urbanist text-gray-900 no-underline">Contact Us</Link>
                    </div>
                </div>

                <hr className="my-4 border-gray-300" />

                <div className="flex justify-evenly p-[10px_80px]">
                    <div className="flex gap-5">
                        <Link to="https://www.termsfeed.com/live/629b5bb2-1f27-435c-9e42-965d7f4dae21" className="text-gray-900 no-underline">Terms</Link>
                        <Link to="https://www.termsfeed.com/live/629b5bb2-1f27-435c-9e42-965d7f4dae21" className="text-gray-900 no-underline">Policy</Link>
                    </div>

                    <p className="text-gray-700">© 2025 Copyright By - ThreatScope</p>

                    <div className="flex gap-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook text-gray-900"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram text-gray-900"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin text-gray-900"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
