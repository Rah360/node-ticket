
import Users from "../models/Users.js"
// var bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs"

export const createUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        console.log(name,email,password)
        let user=await Users.findOne({email})
        if (user){
            res.status(400).json({"message":"user exists"})
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        user = new Users({name,email,password:hashedPass})
        await user.save()
        res.json({
            id : user.id,
            name : user.name,
            email : user.email,
        })
    } catch (error) {
        res.status(500).send("error")
    }
}