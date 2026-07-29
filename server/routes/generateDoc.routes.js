const router = require('express').Router({mergeParams: true})
const generateDocument = require("../controllers/reportGenerator.controller")

router.get('/generate', generateDocument)

module.exports = router
