import React from "react";

const processCards = [
    {
        icon: "📃",
        title: "Simply provide your security logs, and let the system do the rest.",
    },
    {
        icon: "🔍",
        title: "The platform scans for vulnerabilities and potential risks—all locally.",
    },
    {
        icon: "📇",
        title: "Receive a detailed, easy-to-understand security assessment with actionable insights.",
    },
];

const ProcessCard = ({ icon, title }) => {
    return (
        <div className="process-card bg-gray-900 text-white flex items-start p-6 rounded-xl w-[550px]">
            <div className="w-14 h-14 flex items-center justify-center mr-4 text-3xl">{icon}</div>
            <h2 className="text-lg font-light leading-6">{title}</h2>
        </div>
    );
};

const Process = () => {
    return (
        <div className="flex items-center justify-center px-20 py-12 text-gray-900">
            <div className="flex items-center justify-between w-[90%]">
                <div className="max-w-2xl mx-10 text-justify">
                    <h1 className="mb-5 text-3xl font-bold font-[Sigmar]">
                        Get Your Own{" "}
                        <span className="inline-block px-3 py-1 text-white bg-green-400 rounded-md">
                            Cybersecurity Watchdog
                        </span>{" "}
                        — No Cloud, No Compromise!
                    </h1>
                    <p className="text-base leading-7 text-gray-500">
                        Why rely on external servers when you can have complete control? Our hacker-style security
                        analysis runs entirely on your device, ensuring deep insights without sending any data outside.
                        It continuously scans for weaknesses, detects misconfigurations, and provides real-time reports—all
                        while keeping your information private. No logs, no cloud processing, just pure, on-device security
                        intelligence tailored for you.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-5">
                    {processCards.map((process, index) => (
                        <ProcessCard key={index} {...process} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Process;
