const router = require('express').Router({mergeParams: true})
const { downloadReport, generateDocument} = require("../controllers/reportGenerator.controller")

router.get('/generate', generateDocument)
router.get('/pdf', downloadReport)

module.exports = router