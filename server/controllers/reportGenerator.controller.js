const { generateReportDetails } = require("../models/report.models"); 

const generateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id ) {
            return res.status(400).json({success: false, message:"Report id is required"})
        }
        const reportData = await generateReportDetails(id);
        res.json({
            success: true,
            data: reportData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }

};

module.exports = generateDocument