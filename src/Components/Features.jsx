import React from "react";

const features = [
    {
        title: "Dashboard",
        description:
            "A centralized and intuitive dashboard that provides real-time insights, security alerts, and a streamlined user experience.",
        img: "/Assets/dashboard.png",
    },
    {
        title: "No Log Download",
        description:
            "Your data remains secure and private. All processing happens on your device, ensuring maximum security and compliance.",
        img: "/Assets/SecurityIcon.png",
    },
    {
        title: "Analysis & Report Generation",
        description:
            "Get detailed security insights with automated analysis and customized reports to understand vulnerabilities and trends.",
        img: "/Assets/Report.png",
    },
    {
        title: "Autonomous Process",
        description:
            "Our system automates security scans, threat detection, and reporting without manual intervention, ensuring continuous monitoring and efficiency.",
        img: "/Assets/Autonomous.png",
    },
    {
        title: "Up-to-Date Vulnerability Tracking",
        description:
            "Stay ahead of threats with continuously updated vulnerability databases, ensuring protection against the latest risks.",
        img: "/Assets/Update.png",
    },
    {
        title: "Enhanced User Experience",
        description:
            "Designed for both security experts and beginners, our smooth and responsive interface ensures an effortless experience.",
        img: "/Assets/UX.png",
    },
];

const Features = () => {
    return (
        <div className="flex justify-center py-12">
            <div className="grid grid-cols-3 gap-0 w-[90%] border-[]">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`p-10 border  text-[#222] font-bold text-lg w-full h-full 
                        ${index % 2 === 0 ? "bg-[#fbfbfbed]" : "bg-[#ffff]"}`}
                    >
                        <div className="mb-4">
                            <img src={feature.img} alt={feature.title} className="w-16 h-16" />
                        </div>
                        <h3 className="font-[sigmar] my-2 text-xl">{feature.title}</h3>
                        <p className="text-base font-light text-[#444]">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
