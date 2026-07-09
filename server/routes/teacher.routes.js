const express = require("express")
const { createTeacher, deleteTeacher, editTeacher, getTeacher, getTeachers } = require("../controllers/teacher.controller")

const router = express.Router()

router.route('/')
      .post(createTeacher)
      .get(getTeachers)

router.route('/:id')
.get(getTeacher)
.delete(deleteTeacher)
.put(editTeacher)

module.exports = router;