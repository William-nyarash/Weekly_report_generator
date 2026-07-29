
const { response } = require("../app");
const pool = require("../config/db.config")
const Report = require("../models/report.models")
const getAllReports = async () => {
    const result = await pool.query(
        `SELECT * FROM reports`
    )
    return result.rows;
}
const getReport = async (id ) => {
    
        const sqlQuery = `
        SELECT * FROM reports WHERE id = $1
        `
        const result = await pool.query(sqlQuery,[id])
        return result.rows[0]
    
}

const createReport = async (data) => {
    try {
            const {
                teacher_id,
                week_end,
                week_start,
                tutors_class_attendance,
                new_admissions_and_dropouts,
                weeks_activity_completion,
                weeks_activity_not_completed,
                aobs,
                assessment,
                remarks
            } = data
            const sqlQuery = `
            INSERT INTO reports (teacher_id,
            week_start,week_end,tutors_class_attendance,new_admissions_and_dropouts,
            weeks_activity_completion,weeks_activity_not_completed,aobs,assessment,remarks)
            VALUEs ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *
            `

            const values = [teacher_id,
            week_start,week_end,tutors_class_attendance,new_admissions_and_dropouts,weeks_activity_completion,weeks_activity_not_completed,aobs,assessment,remarks
            ]
            
            const result = await pool.query(sqlQuery,values)
             
            console.log("the results is ",result)
            return result.rows[0]
    } catch (error) {
      console.error(error.message)  
      throw error; 
    }
}

const updateReport = async (id, data) => {
    const {
        teacher_id,
        week_start,
        week_end,
        tutors_class_attendance,
        new_admissions_and_dropouts,
        weeks_activity_completion,
        weeks_activity_not_completed,
        aobs,
        assessment,
        remarks
    } = data
    const sqlQuery = ` 
    UPDATE reports SET teacher_id = $1,
    week_start = $2,
    week_end = $3,
    tutors_class_attendance = $4,
    new_admissions_and_dropouts = $5,
    weeks_activity_completion = $6,
    weeks_activity_not_completed = $7,
    aobs = $8,
    assessment = $9,
    remarks = $10
    WHERE id= $11
    RETURNING *`

    const result = await pool.query(sqlQuery,[
        teacher_id,
        week_start,
        week_end,
        tutors_class_attendance,
        new_admissions_and_dropouts,
        weeks_activity_completion,
        weeks_activity_not_completed,
        aobs,
        assessment,
        remarks
    ])

    return result.rows[0]

}

const generateReportDetails = async (reportId)=> {

    const sqlQuery =  `
    SELECT 
    r.id as report_id,
    r.week_start,
    r.week_end,
    r.tutors_class_attendance,
    r.new_admissions_and_dropouts,
    r.weeks_activity_completion,
    r.weeks_activity_not_completed,
    r.aobs,
    r.assessment,
    r.remarks,
    t.full_name as teacher_name,
    t.course,
    t.level,
    a.day_name,
    a.present_students,
    a.absent_students,
    a.teacher_comment as daily_comment
FROM reports r
JOIN teachers t ON r.teacher_id = t.id
LEFT JOIN attendance a ON r.id = a.report_id
WHERE r.id = $1
ORDER BY 
    CASE a.day_name
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
    END;`
    
    try{
        const report = await pool.query(sqlQuery, [reportId])

        if(report.length === 0 ) {
            throw new Error("Report not found")
        }

        const row = report.rows[0]
        const reportData = {
            id: row.report_id,
            weekStart: row.week_start,
            weekEnd: row.week_end,
            tutorClassAttendance: row.tutors_class_attendance,
            newAdmissionsAndDropouts: row.new_admissions_and_dropouts,
            weeksActivityCompletion: row.weeks_activity_completion,
            weeksActivityNotCompleted: row.weeks_activity_not_completed,
            aobs: row.aobs,
            assessment: row.assessment,
            remarks: row.remarks,
            teacher: {
                name: row.teacher_name,
                course: row.course,
                level: row.level
            },
            attendance: []
        };
        report.rows.forEach(row => {
            if (row.day_name) {
                reportData.attendance.push({
                    day: row.day_name,
                    present: row.present_students,
                    absent: row.absent_students,
                    comment: row.daily_comment
                });
            }
        });
        return reportData
    }catch(error) {
        console.error("Error generating report:", error.message);
        throw error;
    }

}
module.exports = {
    getAllReports,
    updateReport,
    createReport,
    generateReportDetails,
    getReport,   
}