import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from "../lib/utils";
import { FileDownIcon, ShieldAlertIcon, TrashIcon } from 'lucide-react';
import Admin from '../../Assets/Admin.png';

const ReportsHistory = () => {
    const [threats, setThreats] = useState([]);

    useEffect(() => {
        const fetchThreats = async () => {
            try {
                const response = await axios.get('http://localhost:3000/threats/threatsdetails', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setThreats(response.data.threats);
                }
            } catch (error) {
                console.error("Error fetching threats:", error);
            }
        };

        fetchThreats();
    }, []);

    const getSeverityBorder = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'critical':
            case 'high':
                return 'bg-[#F9E3DD]';
            case 'medium':
                return 'bg-[#F5C45E]';
            default:
                return 'bg-gray-300';
        }
    };

    const downloadReport = async (threatId) => {
        try {
            const response = await axios.get(`http://localhost:3000/threats/download-report/${threatId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Threat_Report_${threatId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    const deleteThreat = async (threatId) => {
        try {
            await axios.delete(`http://localhost:3000/threats/delete-report/${threatId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setThreats(threats.filter(threat => threat._id !== threatId));
            console.log("Deleted threat with ID:", threatId);
        } catch (error) {
            console.error("Error deleting threat:", error);
        }
    };

    return (
        <div className="relative flex w-[98%] my-3 ml-5 border-[#b4b4b436] border-2 rounded-2xl p-4 h-[95%] bg-white">
            <div className={cn("absolute inset-0 rounded-2xl z-0", "[background-size:20px_20px]", "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]")} />
            <div className="w-full">
                <div className='h-60 bg-slate-600 relative z-20 flex items-center justify-between w-full overflow-hidden rounded-md'>
                    <div className='mt-4'>
                        <img src={Admin} className='w-80' />
                    </div>
                    <div className="flex items-center justify-center h-28  px-4 text-base text-white bg-[#01FF70] shadow-md bg rounded-l-md  ">
                        <div className=" text-center">
                            <h1 className="mb-4 text-xl font-bold">Important Message !</h1>
                            <p >⚠️ ThreatScope is updating its threat database. Some results may be inaccurate. Please verify findings independently.</p>
                        </div>
                    </div>
                </div>
                <div className="sm:grid-cols-2 lg:grid-cols-3 relative z-10 grid w-full grid-cols-1 gap-4 mt-5">
                    {threats.map((threat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "rounded-2xl hover:shadow-lg p-4 transition shadow-sm ",
                                getSeverityBorder(threat.severity)
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <ShieldAlertIcon className="text-current" />
                                    <h3 className="text-sm font-semibold max-w-[200px] truncate" title={threat.threat_name}>
                                        {threat.threat_name}
                                    </h3>
                                </div>
                                <span className="px-2 py-1 text-xs text-white bg-red-600 rounded-full">
                                    {threat.severity || 'Unknown'}
                                </span>
                            </div>

                            <p className="mb-2 text-sm">
                                Detected on: <span className="font-medium">{new Date(threat.detected_at).toLocaleDateString()}</span>
                            </p>
                            <p className="mb-4 text-sm">
                                OWASP: <span className="font-semibold">{threat.owasp_category || 'N/A'}</span>
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    title="Download Full Report"
                                    className="hover:text-black text-current"
                                    onClick={() => downloadReport(threat._id)}
                                >
                                    <FileDownIcon size={20} />
                                </button>
                                <button
                                    title="Delete Threat Report"
                                    className="hover:text-red-600 text-current"
                                    onClick={() => deleteThreat(threat._id)}
                                >
                                    <TrashIcon size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsHistory;
