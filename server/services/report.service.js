const { get } = require('../app');
const Report = require('../models/report.models')

const getAllReports = async () => {
    return await Report.getAllReports();
}

const createReport = async (data) => {
    return await Report.createReport(data);
}
const getReport = async (id) => {
    return await Report.getReport(id)
}

const updateReport = async (id, data) => {
    return await Report.updateReport(id, data)
}
const getReportDetails = async (id ) =>{
        const report = await Report.generateReportDetails(id)
        if(!report ) {
            throw new Error("NO report found")
        }
        return report
}
module.exports = {
    getAllReports,
    createReport,
    updateReport,
    getReportDetails,
    getReport
}