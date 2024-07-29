
import Tickets from "../models/Tickets.js";
import Ticket from "../models/Tickets.js"
import User from "../models/Users.js"

export const createTicket = async (req,res)=>{
    const {title,description,type,status,venue,priority,dueDate} = req.body;
    try {
      const ticket = new Ticket({
        title,description,type,status,venue,priority,dueDate,created_By: req.user.id
      })
      const newticket = await ticket.save()
      res.json(newticket)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const assignUser = async (req,res)=>{
  const {userId} = req.body;
  try {
    const ticket = await Ticket.findById(req.params.ticketId)
    if (!ticket){
      return res.status(404).json({"message":"ticket not found"})
    }
    const user = await User.findById(userId)
    if (!user){
      return res.status(400).json({"message":"user not found"})
    }

    if (ticket.status === "closed"){
      return res.status(400).json({"message":"Cannot assign users to a closed ticket"})
    }

    if (ticket.assignedUsers.includes(userId) ){
      return res.status(400).json({"message":"User already assigned"})
    }

    if (ticket.assignedUsers.length >= 5  ){
      return res.status(400).json({"message":"User assignment limit reached"})
    }

    if (ticket.created_By !== req.user.id){
      return res.status(400).json({"message":"Unauthorized"})
    }
    ticket.assignedUsers.push(userId)
    await ticket.save()
 
    res.json({"message": "User assigned successfully"})
  } catch (error) {
      res.status(500).send("error")
  }
}

export const getAnalytics = async (req,res)=>{
  try {
    const {startDate, endDate,status,priority,type,venue} =req.query
    let query = {}
    if (startDate) {
      query.created_at = {$gte: new Date(startDate)}
    }
    if (endDate) {
      query.created_at = {...query.created_at,$lte: new Date(endDate)}
    }
    if (status) {
      query.status =status
    }
    if (priority) {
      query.priority =priority
    }
    if (type) {
      query.type =type
    }
    if (venue) {
      query.venue =venue
    }

    const tickets = await Tickets.find(query);
    const result = {
      totalTickets : tickets.length,
      closedTickets: tickets.filter(ticket => ticket.status === "closed").length,
      openTickets: tickets.filter(ticket => ticket.status === "open").length,
      inProgressTicket: tickets.filter(ticket => ticket.status === "in-progress").length,
      tickets,
      priorityDistribution: {
        low: tickets.filter(ticket => ticket.priority === 'low').length,
        medium: tickets.filter(ticket => ticket.priority === 'medium').length,
        high: tickets.filter(ticket => ticket.priority === 'high').length,
    },
    typeDistribution: {
        concert: tickets.filter(ticket => ticket.type === 'concert').length,
        conference: tickets.filter(ticket => ticket.type === 'conference').length,
        sports: tickets.filter(ticket => ticket.type === 'sports').length,
    },
    }
    res.status(200).send(result)
  } catch (error) {
      res.status(500).send("error")
  }
}
