import mongoose from 'mongoose';
const { Schema } = mongoose;

const TicketSchema = new Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    type:{
        type: String,
        required : true,
    },
    venue:{
        type: String,
        required : true,
    },
    status: {
        type: String,
        enum: ['open',"in-progress", ,"closed"],
        default: 'open',
    },
    priority: {
        type: String,
        enum: ['high',"low", ,"medium"],
        default: 'open',
    },
    dueDate: {
        type: Date,
        required : true,
    },
    created_By: {
        type: String,
        required : true,
    },
    assignedUsers:[
        {
            type: String,
        }
    ]
},{
    timestamps: true
})

export default mongoose.model("Ticket",TicketSchema)