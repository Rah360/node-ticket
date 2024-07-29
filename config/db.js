import { connect } from "mongoose";

const connection = async  ()=>{
    try {
        await connect('mongodb://127.0.0.1:27017/test');
    } catch (error) {
        console.log("db error",error);
        process.exit(1)
    }
}

export default connection