const Teacher = require('../models/Teacher.model')

const createTeacher = async (request, response ) => {
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
        console.error(err.message)
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
    try{
        const teacher = await Teacher.updateTeacher(
            request.params.id,
            request.body
        )
        response.status(200).json({
            status:"success",
            data: teacher
        })
    } catch(err) {
        console.error(err.message)
    }
}
const getTeacher = async (request, response ) => {
  try{
    const teacher = await Teacher.getById(request.params.id)
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

const deleteTeacher =async (request , response ) => {
  try {
    await Teacher.remove(request.params.id)
    
    response.status(204).send()
  } catch(error) {
    console.log(err.message)
  }
}
module.exports = {
    createTeacher,
    editTeacher,
    getTeacher,
    getTeachers,
    deleteTeacher
}