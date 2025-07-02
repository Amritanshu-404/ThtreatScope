import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../Assets/ErrorImage2.jpg';

const Error = () => {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="flex items-center justify-center object-cover w-full h-screen bg-[#EDEEF2] flex-col">
            <img
                src={ErrorImage}
                alt="Error"
                className="w-2/5"
            />
            <button
                onClick={goBack}
                className="font-Popins rounded-3xl px-4 py-3 text-2xl text-center text-white bg-[#6A3FB3] shadow-slate-500 shadow-lg transition-all animate-bounce"
            >
                Go Back
            </button>
        </div>
    );
};

export default Error;
