const { Pool } = require("pg");
const credentials = require('../datasource/connection');
const pool =  new Pool(credentials);
const {validateEmail}= require("../helpers/validations");
const getUser = async (req,res)=>{
    try {
        const response = await pool.query(`select * from "users"`);
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error);
        res.status(502).json({
            status:502,
            message:"Error de conexion"
        })
    }
   
}

const getUserbyId = async (req,res)=>{
    try {
        const id = req.params.id;
        const response = await pool.query(`select * from "users" where "id"=${id}`);
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error);
        res.status(502).json({
            status:502,
            message:"Error de conexion"
        })
    }
}

    const createUser = async (req,res)=>{
        try {
            const {email,name} =req.body;
            if(typeof email!='undefined'){
                const response = await pool.query(`insert into "users"(name,email) values('${name}','${email}')`);
                res.status(200).json({status:true})
            }else{
                res.status(400).json({"message:":"email requerido"})
            }
        } catch (error) {
            console.log(error);
            res.status(502).json({
                status:502,
                message:"Error de conexion"
            })
        }
   
}

const deleteUserbyId = async (req,res)=>{
    try {
        const id = req.params.id;
        if(id){
            const response = await pool.query(`delete from "users" where "id"=${id}`);
            res.status(204).json({status:true})
        }
    } catch (error) {
        console.log(error);
        res.status(502).json({
            status:502,
            message:"Error de conexion"
        })
    }
}

const updateUser = async (req,res)=>{
    try {
        const id = req.params.id ? req.params.id: null ;
        let  {email,name} =req.body;
        email= typeof email ==  'undefined' ? null : email;
        name= typeof name  ==  'undefined' ? null : name;
        if(id!=null && (email !=null||name!=null ) ){
            email = email != null ? ` '${email}' `:null;
            name = name != null ? ` '${name}' `:null;
            if(email){
                let correo= await validateEmail(email);
                if(correo==false){
                    return res.status(400).json({message:"correo invalido"})
                }
            }
            const response = await pool.query(`CALL public.sp_updateuser(
                '${id}', 
                ${name},
                ${email}
                )`);
                return res.status(204).json({status:true})
        }else{
            return res.status(400).json({message:"parametros invalidos"})
        }
      } catch (error) {
        console.log(error);
        res.status(502).json({
            status:502,
            message:"Error de conexion"
        })
    }

    
}
module.exports={
    getUser,
    getUserbyId,
    createUser,
    deleteUserbyId,
    updateUser
}