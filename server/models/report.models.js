
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
    console.log("the parameter ", id)
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
module.exports = {
    getAllReports,
    updateReport,
    createReport,
    getReport,   
}