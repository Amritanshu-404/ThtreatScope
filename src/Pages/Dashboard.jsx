import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "../lib/utils";

const Dashboard = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [username, setUsername] = useState("User");
    const [totals, setTotals] = useState(0);
    const [criticals, setCriticals] = useState(0);
    const [lastType, setLastType] = useState("N/A");
    const [threatName, setThreatName] = useState("N/A");
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [issueData, setIssueData] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const COLORS = ["#ff4d4d", "#ffcc00", "#66ccff", "#99ff99", "#ff66b2", "#3399ff", "#ff9966", "#cc66ff", "#66ff99", "#ff6666"];
    const owaspCategories = [
        "BROKEN_ACCESS_CONTROL",
        "CRYPTOGRAPHIC_FAILURES",
        "INJECTION",
        "INSECURE_DESIGN",
        "SECURITY_MISCONFIGURATION",
        "VULNERABLE_AND_OUTDATED_COMPONENTS",
        "IDENTIFICATION_AND_AUTHENTICATION_FAILURES",
        "SOFTWARE_AND_DATA_INTEGRITY_FAILURES",
        "SECURITY_LOGGING_AND_MONITORING_FAILURES",
        "SERVER_SIDE_REQUEST_FORGERY"
    ];
    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" }));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const [userRes, threatsRes] = await Promise.all([
                    axios.get("http://localhost:3000/user", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://localhost:3000/threats/threatsdetails", { headers: { Authorization: `Bearer ${token}` } })
                ]);
                console.log("Threats data:", threatsRes.data);
                setUsername(userRes.data.username);

                const threats = threatsRes.data.threats;
                setTotals(threats.length);
                const criticalThreats = threats.filter(threat => threat.severity === "Critical").length;
                setCriticals(criticalThreats);
                if (threats.length > 0) {
                    const sortedThreats = [...threats].sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at));
                    const latestThreat = sortedThreats[0];
                    setLastType(latestThreat.severity || "N/A");
                    setThreatName(latestThreat.threat_name || "N/A");
                }

                const daysMap = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
                threats.forEach(threat => {
                    const day = new Date(threat.detected_at).toLocaleDateString("en-US", { weekday: "short" });
                    daysMap[day] += 1;
                });

                setBarData(Object.keys(daysMap).map(day => ({ day, reports: daysMap[day] })));
                const threatCounts = threats.reduce((acc, threat) => {
                    const category = threat.owasp_category || "Unknown";
                    acc[category] = (acc[category] || 0) + 1;
                    return acc;
                }, {});

                const pieChartData = Object.entries(threatCounts).map(([category, count]) => ({
                    name: category,
                    value: count
                }));
                setPieData(pieChartData.length > 0 ? pieChartData : [{ name: "No Threats", value: 1 }]);

                const baseSeverities = ["Critical", "High", "Medium"];
                const severityCounts = threats.reduce((acc, threat) => {
                    if (threat.severity !== "Critical") {
                        acc[threat.severity] = (acc[threat.severity] || 0) + 1;
                    }
                    return acc;
                }, {});

                baseSeverities.forEach(sev => {
                    if (!severityCounts[sev]) {
                        severityCounts[sev] = 0;
                    }
                });


                const totalNonCritical = Object.values(severityCounts).reduce((sum, count) => sum + count, 0) || 1;
                const severityData = baseSeverities.map(severity => ({
                    severity,
                    count: severityCounts[severity],
                    percentage: ((severityCounts[severity] / totalNonCritical) * 100).toFixed(1)
                }));


                setIssueData(severityData);
                const recommendationsList = [...new Set(
                    threats.map(threat => threat.recommendation).filter(Boolean)
                )];
                setRecommendations(recommendationsList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="relative flex w-[98%] my-3 ml-5 border-[#b4b4b436] border-2 rounded-2xl p-4 h-[95%] bg-white">
            <div className={cn("absolute inset-0 rounded-2xl", "[background-size:20px_20px]", "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]")} />
            <div className=" relative z-20 flex w-full">
                <div className="w-3/4 p-1">
                    <h1>{currentDate}</h1>
                    <h1 className="pt-3 mb-4 text-3xl font-bold">Hello, {username} ✌️</h1>
                    <div className="flex flex-wrap gap-6 mt-2">
                        <div className="rounded-2xl w-3/5 p-4 bg-white border-2 border-dashed">
                            <h2 className="mb-6 text-xl font-semibold text-gray-700">Day-wise Reports</h2>
                            <ResponsiveContainer width="100%" height={212}>
                                <BarChart data={barData}>
                                    <XAxis dataKey="day" stroke="#333" />
                                    <YAxis stroke="#333" domain={[0, 10]} allowDecimals={false} />
                                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                                    <Legend />
                                    <Bar dataKey="reports" fill="#01FF70" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="rounded-2xl w-1/3 p-4 bg-white border-2 border-dashed">
                            <h2 className="mb-2 text-xl font-semibold text-gray-700">Threat Composition</h2>
                            <ResponsiveContainer width="100%" height={212}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value, name) => [`${value}`, name]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-6">
                        <div className="rounded-2xl border-[#b4b4b436] border-2 w-3/5 p-4 bg-white shadow-sm">
                            <h1 className="text-xl font-semibold text-gray-700">Reporting</h1>
                            <div className="group relative">
                                <table className="border-spacing-0 w-full mt-4 text-center border-separate table-fixed">
                                    <tbody>
                                        <tr className="border-t border-gray-300">
                                            <td className="w-1/2 p-2 border-b border-r border-gray-300">
                                                {totals}
                                                <br />
                                                <span className="text-slate-500 font-bold">Total Threats</span>
                                            </td>
                                            <td className="w-1/2 p-2 border-b border-gray-300">
                                                {criticals}
                                                <br />
                                                <span className="text-slate-500 font-bold">Criticals</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-1/2 p-2 border-r border-gray-300">
                                                {lastType}
                                                <br />
                                                <span className="text-slate-500 font-bold">Last Type</span>
                                            </td>
                                            <td className="group relative w-1/2 p-2">
                                                <div className="max-w-full truncate cursor-default" title={threatName}>
                                                    {threatName}
                                                </div>
                                                <span className="text-slate-500 font-bold">Latest Threat</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="rounded-2xl border-[#b4b4b436] border-2 w-1/3 p-4 bg-white shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-700">Issue Total</h2>
                            {issueData
                                .filter(({ severity }) => severity === "High" || severity === "Medium")
                                .map(({ severity, count, percentage }) => (
                                    <div key={severity} className="mb-2">
                                        <p className="text-sm text-gray-600">{severity} ({count})</p>
                                        <div className="w-full h-2 mb-3 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: severity === "High" ? "#ff4d4d" : "#ffcc00",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
                <div className="border-[#b4b4b436] border-2 bg-white rounded-2xl w-[27%] p-4 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">Recommendations</h2>
                    <div className="scrollbar-hidden max-h-[90%] space-y-4 overflow-y-auto">
                        {recommendations.length > 0 ? (
                            recommendations.map((recommendation, index) => (
                                <div key={index} className="p-4 border-l-4 border-[#01FF70] shadow-sm rounded-lg bg-green-50">
                                    <p className="text-md text-gray-700">{recommendation}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No recommendations available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
export default Dashboard;
