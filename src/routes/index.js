const express = require('express');
const router = express.Router();
const {getUser,getUserbyId,createUser,deleteUserbyId,updateUser} = require("../controllers/user-contoller");
router.get("/",(req,res)=>{
    res.send("aplications created by jose luis poot")
});

router.get("/users",getUser)
router.get("/users/:id",getUserbyId)
router.post("/users",createUser)
router.delete("/users/:id",deleteUserbyId)
router.patch("/users/:id",updateUser)

module.exports= router;