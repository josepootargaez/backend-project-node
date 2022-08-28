const { Pool } = require("pg");
const credentials = require('../datasource/connection');
const pool =  new Pool(credentials);

const getUser = async (req,res)=>{
    const response = await pool.query(`select * from "users"`);
    console.log(response.rows);
    res.send('users');
}

module.exports={
    getUser
}