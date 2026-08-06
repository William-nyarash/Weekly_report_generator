const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require("./middleware/error.middleware");

const app = express()
const docGenerator= require('./routes/generateDoc.routes')
const userRoutes = require('./routes/teacher.routes')
const reportRoutes = require('./routes/report.routes')
app.use(morgan('combined'))
app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use(cors({origin: ['http://localhost:4173', 'http://localhost:5173','https://gtireport-generator.onrender.com'],credentials: true}))

app.use('/gti/teacher', userRoutes)
app.use('/gti/reports', reportRoutes)
app.get('/', (req , res) => {
    res.status(200).json({success: true, message: "server is health" , timestamp: new Date().toISOString()})
})
app.use('/gti/reports/:id', docGenerator)
app.get('/status', (request, response) => {
    response.status(200).json({ success: true, message: 'Server is running', timestamp: new Date().toISOString()})
})
app.use((request, response ) => {
    response.status(404).json({ success: false, status: 'fail', message: `Can't find ${request.originalUrl} on this server`})
})
app.use(errorHandler)

module.exports = app