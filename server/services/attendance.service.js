const Attendance = require("../models/attendance.model");

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

const createWeekAttendance = async (reportId, attendance) => {
    
    if (!Array.isArray(attendance)) {
        throw new Error("Attendance must be an array.");
    }

    if (attendance.length !== 5) {
        throw new Error("Exactly five attendance records are required.");
    }

    const days = attendance.map(day => day.day_name);

    for (const day of DAYS) {
        if (!days.includes(day)) {
            throw new Error(`${day} attendance is missing.`);
        }
    }

    return await Attendance.createWeekAttendance(reportId, attendance);
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
    updateWeekAttendance
};