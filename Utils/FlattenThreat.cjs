function FlattenThreatData(threatData, userId) {
    const flatten = (val) => Array.isArray(val) ? val.join(", ") : val;

    return {
        userId,
        threat_name: flatten(threatData.threat_name),
        description: threatData.description,
        severity: threatData.severity,
        owasp_category: flatten(threatData.owasp_category),
        device_details: flatten(threatData.device_details),
        port_service: flatten(threatData.port_service),
        recommendation: threatData.recommendation,
        detected_at: new Date()
    };
}

module.exports = FlattenThreatData;
