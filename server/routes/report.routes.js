
const express = require('express')
const { getReport, createReport, updateReport, getReports } = require('../controllers/report.controller')

const router = express.Router()

router.route('/')
.post(createReport)
.get(getReports)
router.route('/:id')
    .put(updateReport)
    .get(getReport)

module.exports = router;