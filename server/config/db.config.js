require("dotenv").config()
const { Pool } = require("pg")

const database = process.env.PGDATABASE

const connectionstring = `postgresql://${process.env.PGUSER}:${process.env.PASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`

const pool = new Pool({
    connectionString: connectionstring,
});

module.exports = {
    query:(text, params) =>  pool.query(text, params),
    end: ()=> pool.end()
}