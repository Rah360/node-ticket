
import Users from "../models/Users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({email})
        if (!user){
            res.status(400).json({"message":"user doesnt exist"})
            return
        }

        const match = await bcrypt.compare(password,user.password)
        if (!match){
            res.status(400).json({"message":"invalid password"})
            return
        }
        const payload = { user:{id:user.id}}
        jwt.sign(payload,"secret",{expiresIn:'1h'},(err,token)=>{
            if (err){
                throw err
            }
            res.json({token})
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("error")
    }
}