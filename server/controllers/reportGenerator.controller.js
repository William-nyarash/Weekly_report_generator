const { generateReportDetails } = require("../models/report.models"); 
const generateWeeklyReport = require("../utils/generatePdf");
const reportService = require("../services/report.service")

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

const downloadReport = async (req , res, next ) => {
    const { id } = req.params
    try {
        const report = await reportService.getReportDetails(id)
        generateWeeklyReport(report, res)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    generateDocument,
    downloadReport 
}