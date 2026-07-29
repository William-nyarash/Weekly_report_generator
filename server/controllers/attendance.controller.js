const attendanceService = require("../services/attendance.service");

const createWeekAttendance = async (req, res, next) => {
    try {
        const { reportId } = req.params;
        const { attendance } = req.body;

        console.log("Report ID:", reportId);
        console.log("Attendance:", attendance);
        console.log("Is Array?", Array.isArray(attendance));

        if (!Array.isArray(attendance)) {
            return res.status(400).json({
                status: "fail",
                message: "'attendance' must be an array.",
            });
        }

        const result = await attendanceService.createWeekAttendance(
            reportId,
            attendance
        );

        return res.status(201).json({
            status: "success",
            results: result.length,
            data: result,
        });

    } catch (err) {
        if (err.message === "Attendance already exists.") {
            return res.status(409).json({
                status: "fail",
                message: err.message,
            });
        }

        next(err);
    }
};

const getWeekAttendance = async (req, res, next) => {
    try {
        const { reportId } = req.params;

        const attendance = await attendanceService.getWeekAttendance(reportId);

        return res.status(200).json({
            status: "success",
            results: attendance.length,
            data: attendance,
        });

    } catch (err) {
        next(err);
    }
};

const updateWeekAttendance = async (req, res, next) => {
    try {
        const { reportId } = req.params;
        const { attendance } = req.body;

        if (!Array.isArray(attendance)) {
            return res.status(400).json({
                status: "fail",
                message: "'attendance' must be an array.",
            });
        }

        const result = await attendanceService.updateWeekAttendance(
            reportId,
            attendance
        );

        return res.status(200).json({
            status: "success",
            results: result.length,
            data: result,
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createWeekAttendance,
    getWeekAttendance,
    updateWeekAttendance,
};