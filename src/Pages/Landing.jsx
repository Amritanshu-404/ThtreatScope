import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Company from '../Components/Company';
import Features from '../Components/Features';
import Process from '../Components/Process';
import Testimonial from '../Components/Testimonial';
import Facts from '../Components/Facts';
import Enquiry from '../Components/Enquiry';
import Footer from '../Components/Footer';
import About from '../Components/About';

const Landing = () => {
    const [showAbout, setShowAbout] = useState(false);

    return (
        <div>
            <div className='UpperMain flex flex-col items-center bg-[#181818] pt-4 w-full h-[700px]'>
                <div className='Header p-[40px] w-11/12 h-6 flex justify-between items-center border-2 border-white'>
                    <div className='Logo'>
                        <img src='../../Assets/Logo.png' alt="Logo" />
                    </div>
                    <div className='Navbar'>
                        <li><Link to="/" onClick={() => setShowAbout(false)}>Home</Link></li>
                        <li><Link to="#" onClick={() => setShowAbout(true)}>About Us</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </div>
                    <button><Link to="/login">Login</Link></button>
                </div>
                {!showAbout ? (
                    <>
                        <div className='SloganSection'>
                            <div className='Defender'>
                                <img src="../../Assets/Security.png" alt="Security" />
                            </div>
                            <div className="Slogan">
                                <h1>" Detect Vulnerabilities and Analyze Threats "</h1>
                                <p> We provide deep visibility into risks and secure your digital environment. <br /> Because true security isn’t just about responding to attacks—it’s about understanding them before they happen.</p>
                                <Link to="https://owasp.org/www-project-top-ten/">
                                    <p className='Discover flex font-extrabold text-[#01FF70] gap-x-3'>Discover Them <img src='../../Assets/diagonal-arrow.png' alt="arrow" /></p>
                                </Link>
                            </div>
                            <div className='Criminal'>
                                <img src='../../Assets/CyberCriminal.png' alt="Cyber Criminal" />
                            </div>
                        </div>
                        <Company />
                        <Features />
                        <Process />
                        <Testimonial />
                        <Facts />
                        <div className="w-4/5 ml-[100px] mt-20 p-[30px_50px] flex gap-[50px] items-center">
                            <div className="w-1/2">
                                <img src="../../Assets/Cyber.png" alt="Cyber Security" className="w-full" />
                            </div>
                            <div className="w-1/2">
                                <h1 className="text-4xl font-bold font-[sigmar]">Your Ultimate <br /> CyberSecurity Partner.</h1>
                                <p className="mt-[30px] leading-[20px] font-poppins text-gray-500">
                                    Secure Your Digital World with - <span className="text-[#01FF70] italic font-extrabold text-[20px]">ThreatScope</span> -
                                    Protect your data with our fast, reliable, and easy-to-use cybersecurity platform. Join thousands of users who trust us to keep their information safe.
                                </p>
                                <Link to="/login">
                                    <button className="bg-[#01FF70] rounded-[10px] border-none w-[150px] p-[12px] mt-4 font-bold">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <Enquiry />
                    </>
                ) : (
                    <About />
                )}
                <Footer />
            </div>

        </div>
    );
}

export default Landing;
