import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "../lib/utils";
import mammoth from "mammoth";
import { LOG_KEYWORDS } from "../Data/LogKeywords.js";
import PORTSSERVICES from '../Data/PortsServices.js';
import DEVICES from '../Data/Devices.js';

const THREAT_DATABASE = {
    "BROKEN_ACCESS_CONTROL": {
        severity: "Critical",
        recommendation: "Enforce server-side authorization checks, implement role-based access control (RBAC) with least privilege, and regularly review access policies. Monitor and alert on unauthorized access attempts."
    },
    "CRYPTOGRAPHIC_FAILURES": {
        severity: "Critical",
        recommendation: "Adopt industry-standard cryptographic algorithms (e.g., AES-256, RSA-2048), disable outdated protocols like MD5 and SHA-1, enforce TLS 1.2+, and periodically audit cryptographic implementations."
    },
    "INJECTION": {
        severity: "Critical",
        recommendation: "Use parameterized queries, input validation, and output sanitization. Employ ORM frameworks and prepared statements, and consider deploying a Web Application Firewall (WAF) to block injection attempts."
    },
    "INSECURE_DESIGN": {
        severity: "High",
        recommendation: "Integrate security into the design phase by applying secure development practices, conducting threat modeling, and performing design reviews. Use established security patterns to mitigate design-level vulnerabilities."
    },
    "SECURITY_MISCONFIGURATION": {
        severity: "High",
        recommendation: "Ensure hardened default configurations, remove unnecessary services, and restrict access to sensitive files. Regularly audit and update configurations and monitor for any misconfigurations."
    },
    "VULNERABLE_AND_OUTDATED_COMPONENTS": {
        severity: "Critical",
        recommendation: "Maintain an up-to-date inventory of components, enforce strict update and patch management policies, and remove unsupported software. Use automated tools to monitor vulnerabilities and apply critical patches promptly."
    },
    "IDENTIFICATION_AND_AUTHENTICATION_FAILURES": {
        severity: "Critical",
        recommendation: "Enforce multi-factor authentication (MFA), implement strong password policies, and use account lockouts with rate limiting. Regularly review authentication logs and implement adaptive risk-based authentication measures."
    },
    "SOFTWARE_AND_DATA_INTEGRITY_FAILURES": {
        severity: "Critical",
        recommendation: "Employ digital signatures, integrity checks, and cryptographic hashing to verify data and code integrity. Reject unverified updates automatically and monitor integrity logs for unauthorized changes."
    },
    "SECURITY_LOGGING_AND_MONITORING_FAILURES": {
        severity: "Medium",
        recommendation: "Implement centralized, tamper-proof logging and real-time monitoring. Establish comprehensive alerting and incident response procedures, and ensure that audit trails are thorough and securely stored."
    },
    "SERVER_SIDE_REQUEST_FORGERY": {
        severity: "High",
        recommendation: "Validate and sanitize user-supplied URLs and restrict outbound requests. Use allowlists for internal endpoints, monitor for anomalous internal traffic, and regularly update network and access control policies to prevent SSRF attacks."
    }
};

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const extractPortsAndServices = (text) => {
    const result = new Set();
    const textLower = text.toLowerCase();
    Object.keys(PORTSSERVICES).forEach(port => {
        const portNum = parseInt(port, 10);
        const regex = new RegExp(`\\bport\\s*:?\\s*${portNum}\\b`, 'gi');
        if (regex.test(text)) {
            result.add(`${portNum} (${PORTSSERVICES[portNum]})`);
        }
    });
    Object.entries(PORTSSERVICES).forEach(([port, service]) => {
        const serviceRegex = new RegExp(`\\b${service.toLowerCase()}\\b`, 'gi');
        if (textLower.match(serviceRegex)) {
            result.add(`${port} (${service})`);
        }
    });
    return Array.from(result);
};

const extractDevices = (text) => {
    const deviceRegex = new RegExp(`\\b(${DEVICES.join("|")})\\b`, "gi");
    const matches = text.match(deviceRegex) || [];
    return Array.from(new Set(matches.map(d => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase())));
};

const ThreatAnalysis = () => {
    const [fileName, setFileName] = useState("");
    const [threatsData, setThreatsData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsArrayBuffer(file);
        });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setError("");
        setThreatsData([]);
        setIsLoading(true);

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'docx') {
            setError("Unsupported file format. Please upload a .docx file.");
            setIsLoading(false);
            return;
        }

        try {
            const arrayBuffer = await readFileAsArrayBuffer(file);
            const { value } = await mammoth.extractRawText({ arrayBuffer });

            if (!value || value.trim() === "") {
                throw new Error("The document appears to be empty");
            }

            const jsonData = generateThreatJSON(value);
            setThreatsData(jsonData.detected_threats);
        } catch (error) {
            console.error("Error processing file:", error);
            setError(`Failed to process file: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const generateThreatJSON = (logText) => {
        if (!logText) return { detected_threats: [] };

        const logLines = logText.split('\n').filter(line => line.trim() !== '');
        const textLower = logText.toLowerCase();
        const portsAndServices = extractPortsAndServices(logText);
        const devices = extractDevices(logText);
        let selectedThreat = "";
        const severityRank = { "Critical": 3, "High": 2, "Medium": 1 };
        const matchedKeywords = [];

        Object.entries(LOG_KEYWORDS).forEach(([category, keywords]) => {
            const categoryMatches = keywords.filter(keyword => {
                const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`);
                return textLower.match(regex);
            });

            if (categoryMatches.length > 0) {
                matchedKeywords.push({ category, keywords: categoryMatches });

                const normalizedCategory = Object.keys(THREAT_DATABASE).find(threat =>
                    threat === category.toUpperCase()
                );

                if (normalizedCategory) {
                    const currentSeverity = THREAT_DATABASE[normalizedCategory].severity || "Medium";
                    const existingSeverity = THREAT_DATABASE[selectedThreat]?.severity || "Medium";

                    if (severityRank[currentSeverity] > severityRank[existingSeverity]) {
                        selectedThreat = normalizedCategory;
                    }
                }
            }
        });

        const threatInfo = THREAT_DATABASE[selectedThreat] || {
            severity: "Medium",
            recommendation: "Review logs and implement appropriate security measures."
        };

        let highlightedDescription = logLines.join('\n');
        matchedKeywords.forEach(({ keywords }) => {
            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                highlightedDescription = highlightedDescription.replace(
                    regex,
                    match => `<span class="bg-yellow-200 px-1 rounded font-medium">${match}</span>`
                );
            });
        });

        const threatReport = {
            threat_name: selectedThreat,
            owasp_category: matchedKeywords.map(m => m.category),
            severity: threatInfo.severity,
            recommendation: threatInfo.recommendation,
            description: highlightedDescription,
            ports: portsAndServices.length > 0 ? portsAndServices.join(', ') : "Not found",
            device_details: devices.length > 0 ? devices.join(', ') : "Not found",
            detected_at: formatDate(new Date().toISOString()),
            matched_keywords: matchedKeywords.flatMap(m => m.keywords)
        };


        return { detected_threats: [threatReport] };
    };

    const getTextArray = (cls) => {
        return Array.from(document.querySelectorAll(`.${cls}`))
            .map(el => el.textContent.trim().replace(/(Critical|High|Medium)$/, '').trim())
            .filter(Boolean);
    };
    const getText = (cls) => document.querySelector(`.${cls}`)?.textContent?.trim() || "";

    const getSiblingText = (cls) => {
        const el = document.querySelector(`.${cls}`);
        return el?.parentElement ? el.parentElement.textContent.replace(el.textContent, "").trim() : "";
    };

    const handleThreatSubmit = async () => {
        const threatData = {
            threat_name: getTextArray("Threat_name"),
            description: getText("Description"),
            severity: getText("Severity"),
            owasp_category: getTextArray("Owasp-Cat"),
            device_details: getSiblingText("Devices").split(',').map(d => d.trim()),
            port_service: getSiblingText("Ports").split(',').map(p => p.trim()),
            recommendation: getText("Recommendation")
        };
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Token not found. Please log in again.");
                return;
            }
            const response = await axios.post("http://localhost:3000/threats/submitthreats", threatData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            toast.success(response.data.message || "Threat Report Submitted ✅");

        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message;
                if (status === 409) {
                    toast.warn(message || "Log Already Analyzed ⚠️");
                } else {
                    toast.error(message || "Something went wrong on server ❌");
                }
            } else if (error.request) {
                toast.error("No response from server 🚫");
            } else {
                toast.error("Something went wrong while submitting the threat 😕");
            }
            console.error("❌ Error submitting threat:", error);
        }
    };

    return (
        <div className="relative flex w-[98%] my-3 ml-5 border-[#b4b4b436] border-2 rounded-2xl p-4 h-[95%] bg-white">
            <ToastContainer />
            <div className={cn("absolute inset-0 rounded-2xl", "[background-size:20px_20px]", "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]")} />
            <div className="relative z-10 flex flex-col items-center w-full">
                <h2 className="mb-4 text-xl font-bold">Upload Threat Log File (.docx)</h2>
                <label className={`hover:bg-[#1f7946] px-4 py-2 text-white bg-[#01a852] rounded-lg cursor-pointer transition-colors ${isLoading ? 'opacity-50' : ''}`}>
                    {isLoading ? "Processing..." : "Select File"}
                    <input
                        type="file"
                        accept=".docx"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isLoading}
                    />
                </label>
                {fileName && <p className="mt-2 text-gray-700">Uploaded: {fileName}</p>}
                {isLoading && <p className="mt-2 text-blue-500">Processing document...</p>}
                {error && (
                    <div className="max-w-md p-2 mt-2 text-center text-red-700 bg-red-100 rounded-md">
                        {error}
                    </div>
                )}
                {threatsData.length > 0 && (
                    <div className="mt-6 w-full max-h-[80%]">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Threat Analysis Report</h3>
                        {threatsData.map((threat, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-5 mb-4 rounded-lg border-l-4 shadow-sm max-h-[90%] overflow-auto",
                                    threat.severity === "Critical" ? "border-red-500 bg-red-50" :
                                        threat.severity === "High" ? "border-orange-500 bg-orange-50" :
                                            "border-[#01FF70] bg-[#e8f9f0]"
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="Owasp-Cat text-lg font-semibold text-gray-800">{threat.threat_name || "Unidentified Threat"}
                                            <span className={cn(
                                                "Severity inline-block px-2 py-1 rounded-full text-xs font-medium ml-3",
                                                threat.severity === "Critical" ? "bg-red-100 text-red-800" :
                                                    threat.severity === "High" ? "bg-orange-100 text-orange-800" :
                                                        "bg-[#b8f8d8] text-[#017a3d]"
                                            )}>
                                                {threat.severity}
                                            </span>
                                        </h4>
                                    </div>
                                    <span className="DetectedAt text-sm text-gray-500">{threat.detected_at}</span>
                                </div>
                                {threat.matched_keywords && threat.matched_keywords.length > 0 && (
                                    <div className="p-3 mb-4 bg-white border rounded-md">
                                        <h5 className=" mb-2 font-medium text-gray-700">Potential Threats</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from(new Set(threat.matched_keywords)).map((keyword, i) => (
                                                <span
                                                    key={i}
                                                    className="Threat_name px-2 py-1 text-xs font-medium text-[#017a3d] bg-[#b8f8d8] rounded-full"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="md:grid-cols-2 grid grid-cols-1 gap-4 mb-4">
                                    <div className="p-3 bg-white border rounded-md">
                                        <h5 className="mb-2 font-medium text-gray-700">Technical Details</h5>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="Ports font-medium">Ports and Services:</span> {threat.ports}</p>
                                            <p><span className="Devices font-medium">Devices:</span> {threat.device_details}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white border rounded-md">
                                        <h5 className="mb-2 font-medium text-gray-700">Security Recommendation</h5>
                                        <p className="Recommendation text-sm">{threat.recommendation}</p>
                                    </div>
                                </div>

                                <div className="p-3 bg-white border rounded-md">
                                    <h5 className="mb-2 font-medium text-gray-700">Log Details</h5>
                                    <pre
                                        className="Description bg-gray-50 p-2 overflow-x-auto text-sm text-gray-800 rounded"
                                        dangerouslySetInnerHTML={{ __html: threat.description }}
                                    />
                                </div>
                                <div className="Button flex justify-end w-full">
                                    <button
                                        onClick={() => handleThreatSubmit(threat)}
                                        className="px-4 py-2 mt-4 text-white bg-[#01A852] rounded-md"
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default ThreatAnalysis;