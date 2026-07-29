const Attendance = require("../models/attendance.model");

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const createWeekAttendance = async (reportId, attendance) => {
    const existingAttendance = await Attendance.findIfExists(reportId);

    if (existingAttendance.length > 0) {
        throw new Error("Attendance already exists.");
    }

    if (!Array.isArray(attendance)) {
        throw new Error("Attendance must be an array.");
    }

    if (attendance.length !== 5) {
        throw new Error("Exactly five attendance records are required.");
    }

    const days = attendance.map((item) => item.day_name);

    for (const day of DAYS) {
        if (!days.includes(day)) {
            throw new Error(`${day} attendance is missing.`);
        }
    }

    const attendanceData = attendance.map((item) => ({
        report_id: reportId,
        day_name: item.day_name,
        present_students: item.present_students,
        absent_students: item.absent_students,
        teacher_comment: item.teacher_comment || "",
    }));

    return await Attendance.createWeekAttendance(attendanceData);
};

const getWeekAttendance = async (reportId) => {
    return await Attendance.getWeekAttendance(reportId);
};

const updateWeekAttendance = async (reportId, attendance) => {
    return await Attendance.updateWeekAttendance(reportId, attendance);
};

module.exports = {
    createWeekAttendance,
    getWeekAttendance,
    updateWeekAttendance,
};