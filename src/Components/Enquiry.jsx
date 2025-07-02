import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Enquiry = () => {
    const countries = ["India", "USA", "UK", "Australia", "Canada", "Germany", "France", "Japan", "South Korea", "Brazil"];

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        company: '',
        occupation: '',
        country: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/enquiry', formData);
            toast.success(res.data.message || 'Message sent successfully!');
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                company: '',
                occupation: '',
                country: '',
                message: ''
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to send message.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-[30px_150px] flex justify-evenly items-center">
            <ToastContainer position="top-right" autoClose={4000} />

            <div className="font-urbanist w-1/3 text-2xl italic font-semibold text-[#31313171] leading-10">
                <p>Have any questions or need more information? We are here to assist you. Please fill out the form below, and our team will get back to you as soon as possible.</p>
            </div>

            <form className="gap-y-7 flex flex-col w-2/5" onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    required
                    placeholder='youremail404@gmail.com'
                    className="border border-gray-400 rounded-[10px] w-full p-3"
                    value={formData.email}
                    onChange={handleChange}
                />

                <div className="gap-x-5 gap-y-5 grid grid-cols-2">
                    <input
                        type="text"
                        name="first_name"
                        placeholder='First Name *'
                        required
                        className="border border-gray-400 rounded-[10px] p-3 w-full"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder='Last Name *'
                        required
                        className="border border-gray-400 rounded-[10px] p-3 w-full"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder='Company'
                        className="border border-gray-400 rounded-[10px] p-3 w-full"
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="occupation"
                        placeholder='Occupation *'
                        required
                        className="border border-gray-400 rounded-[10px] p-3 w-full"
                        value={formData.occupation}
                        onChange={handleChange}
                    />
                </div>

                <select
                    name="country"
                    required
                    className="border border-gray-400 rounded-[10px] p-3 w-full"
                    value={formData.country}
                    onChange={handleChange}
                >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </select>

                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="border border-gray-400 rounded-[10px] p-3 w-full h-[200px] resize-none"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>

                <button
                    type="submit"
                    disabled={loading}
                    className={`font-[sigmar] text-xl p-3 rounded-[10px] border-none ${loading ? 'bg-gray-400' : 'bg-[#01FF70]'} text-[#181818] transition`}
                >
                    {loading ? 'Sending...' : 'Message Us'}
                </button>
            </form>
        </div>
    );
};

export default Enquiry;
