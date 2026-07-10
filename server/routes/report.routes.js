
const express = require('express')
const { getReport, createReport, updateReport, getReports } = require('../controllers/report.controller')
const attendanceRoutes = require("./attendance.routes")

const router = express.Router()

router.route('/')
.post(createReport)
.get(getReports)
router.route('/:id')
    .put(updateReport)
    .get(getReport)
router.use('/:reportId/attendance', attendanceRoutes)

module.exports = router;