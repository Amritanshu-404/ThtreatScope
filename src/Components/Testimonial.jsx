import React, { useState, useEffect } from "react";

const testimonials = [
    {
        id: 1,
        text: "The platform is incredibly efficient in analyzing security logs. It provides detailed insights without compromising data privacy. A must-have for anyone serious about security monitoring!",
        name: "Stefanie Rashford",
        role: "Cybersecurity Analyst",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        text: "An outstanding tool for security professionals! The automated analysis and real-time reports help us stay ahead of vulnerabilities. The fact that all processing happens locally is a game-changer!",
        name: "Michael Johnson",
        role: "Security Engineer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 3,
        text: "A seamless experience from start to finish. The interface is user-friendly, and the security reports are incredibly detailed. It saves us hours of manual log review!",
        name: "Emma Watson",
        role: "Penetration Tester",
        image: "https://randomuser.me/api/portraits/women/30.jpg",
    },
    {
        id: 4,
        text: "I was impressed with the speed and accuracy of the analysis. The ability to analyze logs without any data leaving my device ensures complete privacy. A brilliant solution for security-conscious users!",
        name: "David Thompson",
        role: "Ethical Hacker",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
        id: 5,
        text: "The platform makes security analysis effortless. No complex configurations—just upload the log and get detailed reports instantly. It’s like having a personal security analyst at my fingertips!",
        name: "Sophia Miller",
        role: "SOC Analyst",
        image: "https://randomuser.me/api/portraits/women/36.jpg",
    },
    {
        id: 6,
        text: "This tool has significantly improved our security workflow. The ability to analyze vulnerabilities on the fly without cloud dependency ensures full control over sensitive data.",
        name: "Ryan Carter",
        role: "Red Team Specialist",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        id: 7,
        text: "I no longer have to manually sift through endless logs. This platform provides actionable insights with a single click, making vulnerability detection much easier.",
        name: "Isabella Garcia",
        role: "Forensic Analyst",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
        id: 8,
        text: "Finally, a security tool that respects privacy while delivering high-quality analysis. The automated reports help me quickly assess risks without any extra effort.",
        name: "Liam Peterson",
        role: "CTO, Cybersecurity Firm",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
    }
];
const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextTestimonial = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            setFade(false);
        }, 500);
    };

    const prevTestimonial = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
            );
            setFade(false);
        }, 500);
    };

    return (
        <div className="testimonial-container w-3/4 py-[60px] px-[30px] ml-64">
            <div className="THead">
                <h4 className
                    ="font-[Urbanist] tracking-[8px] text-xs font-bold text-[#2d2d2d]">TESTIMONIALS</h4>
                <h1 className="text-[3.4rem] font-bold my-2">Customer's Experience</h1>
            </div>
            <p className="extra absolute text-[#01FF70] text-[10rem]">"</p>
            <div className="testimonial-section">
                <hr className="border-gray-500/25 border" />
                <p className={`testimonial-text ${fade ? 'fade-out' : 'fade-in'}`}>
                    {testimonials[currentIndex].text}
                </p>
                <div className={`testimonial-user ${fade ? 'fade-out' : 'fade-in'}`}>
                    <img className="bg-slate-800 w-16 h-16 rounded-full" src={testimonials[currentIndex].image} alt="User" />
                    <div>
                        <h3 className="m-0 text-lg font-bold">{testimonials[currentIndex].name}</h3>
                        <p>{testimonials[currentIndex].role}</p>
                    </div>
                </div>
            </div>

            <div className="testimonial-controls flex justify-center gap-5 mt-5">
                <button
                    onClick={prevTestimonial}
                    className="flex justify-center items-center border border-gray-300/45 bg-gray-100 text-green-400 w-12 h-12 rounded-full text-2xl p-2 transition-transform duration-300 hover:border-gray-800 hover:scale-110"
                >
                    &larr;
                </button>
                <button
                    onClick={nextTestimonial}
                    className="flex justify-center items-center border border-gray-300/45 bg-gray-100 text-green-400 w-12 h-12 rounded-full text-2xl p-2 transition-transform duration-300 hover:border-gray-800 hover:scale-110"
                >
                    &rarr;
                </button>
            </div>

        </div>
    );
};

export default Testimonial;
