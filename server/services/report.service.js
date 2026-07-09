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
const updateReport = async () => {
    return await Report.updateReport(id, data)
}
module.exports = {
    getAllReports,
    createReport,
    updateReport,
    getReport
}