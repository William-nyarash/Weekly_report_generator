require("dotenv").config()
const { Pool } = require("pg")

const database = process.env.PGDATABASE

const connectionstring = `postgresql://${process.env.PGUSER}:${process.env.PASSWORD}@${process.env.PGHOST}/${database}`
const pool = new Pool({
    connectionString: connectionstring,    
        ssl: {
            rejectUnauthorized: false
        }
    });

module.exports = {
    query:(text, params) =>  pool.query(text, params),
    end: ()=> pool.end(),
    connect: ()=> pool.connect(),
    pool
}
