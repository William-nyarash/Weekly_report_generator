const { read } = require("pdfkit");
const pool = require("../config/db.config")

const getAll = async () => {
    const result = await pool.query(
        'SELECT * FROM teachers ORDER BY full_name'
    );
    return result.rows;
};
const  createTeacher = async ( data ) => {

    const sqlQuery =`
        INSERT INTO  teachers (full_name, course, level)
        VALUES ($1, $2, $3)
        RETURNING *;
    ` ;

    const values = [
        data.full_name,
        data.course,
        data.level
    ]
    const result = await pool.query(sqlQuery, values);

    return result.rows[0]
}
const updateTeacher = async (id, data) => {
    const result = await pool.query(
        `UPDATE teachers
         SET full_name = $1,
             course = $2,
             level = $3
         WHERE id = $4
         RETURNING *`,
        [
            data.full_name,
            data.course,
            data.level,
            id
        ]
    );

    return result.rows[0];
}

const getTeacherById = async (id) => {
    const sqlQuery = `
        SELECT * FROM   teachers
        where id=$1`

    const results = await pool.query(sqlQuery,[id])

    return results.rows[0]
}
module.exports = {
    getAll,
    createTeacher,
    updateTeacher,
    getTeacherById
};