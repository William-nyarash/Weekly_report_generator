const Teacher = require('../models/Teacher.model')

const createTeacher = async (request, response, next ) => {
    try{
        const { full_name, course, level } = request.body
        if(!full_name || !course || !level) {
            return response.status(400).json({
                status: 'fail',
                message: "All fields are required"
            })
        } 
       const teacher = await Teacher.createTeacher({
         full_name,
         course,
         level
        })
        response.status(201).json({
         status: 'success',
         data: teacher
        })

    } catch(err) {
        next(err)
    }
}
const getTeachers = async ( request, response ) => {
    try {
        const teachers = await Teacher.getAll()
        response.status(200).json({
            status: 'success',
            results: teachers.length,
            data: teachers
        })
    } catch (error) {
        console.log(error.message)
    }
}

const editTeacher = async (request , response ) => {
    const { id } = request.params
    try{
        const teacher = await Teacher.updateTeacher(
            id,
            request.body
        )
        response.status(200).json({
            status:"success",
            data: teacher
        })
    } catch(err) {
        next(err)
    }
}
const getTeacher = async (request, response ) => {
    const { id } = request.params
  try{
    const teacher = await Teacher.getTeacherById( id)
    if(!teacher) {
        return response.status(404).json({
            status: 'fail',
            message: "Teacher not found"
        })
    }
    response.status(200).json({
        status: 'success',
        data: teacher
    })
  } catch(err) {
    console.error(err.message)
  }
}

const deleteTeacher =async (request , response, next ) => {
    const { id }  = request.params
  try {
    await Teacher.remove(id)
    
    response.status(204).send()
  } catch(error) {
    next(error)
  }
}
module.exports = {
    createTeacher,
    editTeacher,
    getTeacher,
    getTeachers,
    deleteTeacher
}