const pool = require("../config/db.config");

const createWeekAttendance = async (reportId, attendance) => {
         const db = await pool.connect()
    try {
   
        await db.query("BEGIN");
        const sql = `
            INSERT INTO attendance
            (
                report_id,
                day_name,
                present_students,
                absent_students,
                teacher_comment
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
        `;

        const records = [];

        for (const day of attendance) {

            const result = await db.query(sql, [
                reportId,
                day.day_name,
                day.present_students,
                day.absent_students,
                day.teacher_comment
            ]);

            records.push(result.rows[0]);
        }
        await db.query("COMMIT");

        return records;

    } catch (err) {

        await db.query("ROLLBACK");

        throw err;

    } finally {
        await db.release()

    }
};

const getWeekAttendance = async (reportId) => {

    const query = `
    SELECT * 
    FROM   attendance
    WHERE report_id = $1
    ORDER BY 
    CASE day_name
    WHEN  'Monday' THEN 1
    WHEN 'Tuesday' THEN 2
    WHEN 'Wednesday' THEN 3
    WHEN 'Thursday' THEN 4
    WHEN 'Friday' THEN 5
    END;`

    const result = await pool.query(query,[reportId])
    return result.rows;

}

const updateWeekAttendance = async (reportId, attendance) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const sql = `
            UPDATE attendance
            SET
                present_students = $1,
                absent_students = $2,
                teacher_comment = $3
            WHERE
                report_id = $4
            AND
                day_name = $5
            RETURNING *;
        `;

        const records = [];

        for (const day of attendance) {

            const result = await client.query(sql, [
                day.present_students,
                day.absent_students,
                day.teacher_comment,
                reportId,
                day.day_name
            ]);

            records.push(result.rows[0]);
        }

        await client.query("COMMIT");

        return records;

    } catch (err) {

        await client.query("ROLLBACK");
        throw err;

    } finally {

        client.release();

    }
}

module.exports = {
    createWeekAttendance,
    updateWeekAttendance,
    getWeekAttendance
};