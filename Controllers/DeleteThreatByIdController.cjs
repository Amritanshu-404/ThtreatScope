const Threat = require("../Models/Threat.cjs");

const deleteThreatById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedThreat = await Threat.findByIdAndDelete(id);

        if (!deletedThreat) {
            return res.status(404).json({
                success: false,
                message: 'Threat not found or already deleted',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Threat deleted successfully',
            threat: deletedThreat,
        });
    } catch (error) {
        console.error("Error deleting threat:", error);
        res.status(500).json({
            success: false,
            message: 'Server Error while deleting threat',
        });
    }
};

module.exports = deleteThreatById;