const Threat = require("../Models/Threat.cjs");
const PDFDocument = require("pdfkit");

const getThreatById = async (req, res) => {
    const threatId = req.params.id;
    const userId = req.user.id;

    try {
        const threat = await Threat.findOne({ _id: threatId, user: userId });

        if (!threat) {
            return res.status(404).json({ success: false, message: "Threat not found" });
        }

        const portService = Array.isArray(threat.port_service)
            ? threat.port_service.join(", ")
            : threat.port_service || '';

        const devices = Array.isArray(threat.device_details)
            ? threat.device_details.join(", ")
            : threat.device_details || "None";

        const doc = new PDFDocument({ margin: 50 });
        const filename = `Threat-Report-${threatId}.pdf`;

        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);

        doc
            .fontSize(16)
            .fillColor("#01FF70")
            .text("Cyber Threat Analysis Report", { align: "center" })
            .moveDown(1.5);
        const sectionHeader = (title) => {
            doc.moveDown(0.5);
            doc
                .fontSize(11)
                .fillColor("#333")
                .text(title)
                .moveDown(0.2);
            doc.fillColor("black");
        };
        const drawLine = () => {
            doc.moveDown(0.3);
            doc.strokeColor("#cccccc").lineWidth(1).moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.options.margin, doc.y).stroke();
            doc.moveDown(0.5);
        };
        sectionHeader("1. Threat Details");
        doc.fontSize(10).text(`     Threat Name: ${threat.threat_name || "N/A"}`);
        doc.text(`     Detected On: ${new Date(threat.detected_at).toLocaleString()}`);
        doc.text(`     Severity: ${threat.severity || "Not specified"}`);
        doc.text(`     OWASP Category: ${threat.owasp_category || "Not available"}`);

        drawLine();

        sectionHeader("2. Affected Network Ports/Services");
        doc.fontSize(10).text(portService || "No data");

        drawLine();

        sectionHeader("3. Devices Affected");
        doc.fontSize(10).text(devices || "No data");

        drawLine();

        sectionHeader("4. Recommendations");
        doc.fontSize(10).text(threat.recommendation || "No recommendations provided.");

        drawLine();

        sectionHeader("5. Description");
        doc.fontSize(8).text(threat.description || "No description available.", {
            lineGap: 1.5
        });

        doc.end();

    } catch (error) {
        console.error("❌ Error generating PDF:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = getThreatById;
