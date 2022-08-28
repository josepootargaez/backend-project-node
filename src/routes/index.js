const express = require('express');
const router = express.Router();
const {getUser} = require("../controllers/user-contoller");
router.get("/",(req,res)=>{
    res.send("aplications created by jose luis poot")
});

router.get("/users",getUser)

module.exports= router;