const express = require("express")
const router = express.Router()

const attendanceController = require('../controllers/attendance.controller')

router.route('/')
.get(attendanceController.getWeekAttendace)
.post(attendanceController.createWeekAttendance)
.put(attendanceController.updateWeekAttendance)

module.exports = router