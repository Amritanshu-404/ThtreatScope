import React from "react";

const factsData = [
    { icon: "🎯", value: "95%+", text: "Success Rate in Threat Detection and Analysis." },
    { icon: "☠️", value: "100+", text: "Identified and Cataloged Common Vulnerabilities." },
    { icon: "🧑‍💻", value: "80+", text: "Secured Clients Across India." },
    { icon: "⏱️", value: "5-10", text: "Minutes Average Time for Security Analysis." },
];

const Facts = () => {
    return (
        <div className="flex items-center justify-center w-full p-5">
            <div className="justify-evenly flex items-center w-4/5 gap-5">
                {factsData.map((fact, index) => (
                    <div
                        key={index}
                        className="FactCard w-96 h-36 bg-[#FBFBFB] flex items-center gap-3 px-3 rounded-xl">
                        <p className="text-4xl">{fact.icon}</p>
                        <div className="flex flex-col">
                            <h1 className="font-[sigmar] text-3xl">{fact.value}</h1>
                            <p className="text-wrap text-sm leading-snug text-gray-700">
                                {fact.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facts;
