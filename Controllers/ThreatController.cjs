const Threat = require('../Models/Threat.cjs');
const flattenThreatData = require('../utils/FlattenThreat.cjs');

exports.submitThreat = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized 🚫' });

    const threatData = req.body;
    const transformedThreat = flattenThreatData(threatData, userId);

    try {
        const existingThreat = await Threat.findOne({
            userId: transformedThreat.userId,
            threat_name: transformedThreat.threat_name,
            description: transformedThreat.description,
            severity: transformedThreat.severity,
            owasp_category: transformedThreat.owasp_category,
            device_details: transformedThreat.device_details,
            port_service: transformedThreat.port_service,
            recommendation: transformedThreat.recommendation
        });

        if (existingThreat) {
            return res.status(409).json({ message: "Log Already Analyzed ⚠️" });
        }

        const newThreat = new Threat(transformedThreat);
        await newThreat.save();

        res.status(201).json({ message: "Threat saved successfully 🚨", threat: newThreat });

    } catch (err) {
        console.error("🔥 Error saving threat to DB:", err);
        res.status(500).json({ message: "Threat logged but not saved to DB ❌" });
    }
};

exports.getThreats = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const threats = await Threat.find({ userId });

        res.status(200).json({
            success: true,
            threats
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching threats", error: err });
    }
};

