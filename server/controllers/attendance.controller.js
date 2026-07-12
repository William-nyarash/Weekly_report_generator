const attendanceService = require("../services/attendance.service");

const createWeekAttendance = async (req, res, next) => {
    try {
        const data = req.body.attendance
        console.log("the report Id is ", req.params)
        const attendance = await attendanceService.createWeekAttendance(
            req.params.id,
            data
        );
        res.status(201).json({
            status: "success",
            results: attendance.length,
            data: attendance
        });

    } catch (err) {
        next(err);
    }

};

const getWeekAttendance = async (req, res, next) => {
    try {

        const attendance = await attendanceService.getWeekAttendance(
            req.params.id
        );

        res.status(200).json({
            status: "success",
            results: attendance.length,
            data: attendance
        });

    } catch (err) {
        next(err);
    }
};


const updateWeekAttendance = async (req, res, next) => {
    try {

        const attendance = await attendanceService.updateWeekAttendance(
            req.params.reportId,
            req.body.attendance
        );

        res.status(200).json({
            status: "success",
            data: attendance
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createWeekAttendance,
    getWeekAttendance,
    updateWeekAttendance
};
