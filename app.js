import express, { json } from 'express';
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/user.js";
import ticketRoute from "./routes/ticket.js";

import connection from "./config/db.js"

const app = express();
connection()
app.use(json())

const PORT = 3000
app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/tickets",ticketRoute)



app.listen(PORT,()=>{
    console.log("server started!",);
})
