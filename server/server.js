require('dotenv').config()
const app = require('./app')
const pool = require('./config/db.config')

const PORT = process.env.PORT || 3002

const startServer = async () => {
    try {
        //  update this once the db is working
        await pool.query('SELECT NOW()')
         console.log("the db is connected")
         const server= app.listen(PORT, ()=> {
            console.log(`Server is up on port: ${PORT}`)
         })
         process.on('SIGTERM',() => {
            console.log('SIGTERM  received, shutting down gracefully')
            server.close(() => console.log("process terminated"))
         })
    } catch (error) {
        console.error("Database connection failed")
        console.error(error)
        process.exit(1);
    }
}

startServer()