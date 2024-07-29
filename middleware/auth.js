
import jwt from "jsonwebtoken"
export default function (req,res,next){
    const token = req.header("Authorization")?.split(" ")[0];
    console.log(token)
    if(!token){
        return res.status(401).json({message:"no token found"})
    }
    try {
        const decoded = jwt.verify(token,"secret")
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(500).send("error")
    }
}