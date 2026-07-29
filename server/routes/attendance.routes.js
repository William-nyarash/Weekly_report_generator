const express = require("express")
const router = express.Router({mergeParams: true})
const attendanceController = require('../controllers/attendance.controller')

router.route('/')
.get(attendanceController.getWeekAttendance)
.post(attendanceController.createWeekAttendance)
.put(attendanceController.updateWeekAttendance)

module.exports = router