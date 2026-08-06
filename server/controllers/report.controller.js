const reportService = require("../services/report.service")
const documentService = require("../services/document.service")

const createReport = async ( request, response, next ) => {
    try{
        const report = await reportService.createReport(request.body)
        if(!report) {
            return response.status(404).json({
                status: 'fail',
                message: "Report could not be generated retry"
            })
        }
        response.status(201).json({
            status: "success",
            data: report
        })

    } catch(error) {
        next(error)    
    }
}

const getReport = async ( request, response, next ) => {
    try {
        const report = await reportService.getReport(request.params.id)
        if(!report) {
            return response.status(404).json({
                status: 'fail',
                message: "Report not found"
            })
        }
        response.status(200).json({
            status: "success",
            data: report
        })
    } catch(error) {
        next(error)
    }
}

const getReports = async (request, response, next) => {
    try {
        const reports = await reportService.getAllReports();
        if(!reports) {
            return response.status(404).json({
                status: 'fail',
                message: "failed to fetch the resources"
            })
        }
        response.status(200).json({
            status: "success",
            results: reports.lenght,
            data: reports
        })
    } catch (error) {
        next(error)
    }
}
const updateReport = async ( request, response, next ) => {
    try{
        if(!report){
            return response.status(404).json({
                status: 'fail',
                message: "failed to fetch the resources"
            })
        }
        response.status(201).json({
            status: "success",
            data: report
        })
    } catch(error) {
        next(error)
    }
}
const convertToDocx = async ( request, response, next ) => {
 try{
    const file = await DocumentService.generateWord(request.params.id)

    response.download(file)
 } catch(error) {
    next(error)
 }
}
const converToPdf = async ( request, response, next ) => {
    try{
        const file = await DocumentServices.generatePdf(request.params.id)
        response.download(file)
    } catch(error){
        next(error)
    }
}



module.exports = {
    createReport,
    getReport,
    getReports,
    converToPdf,
    convertToDocx,
    updateReport
}