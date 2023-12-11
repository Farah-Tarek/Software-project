const Ticket = require('../models/tickets');
const SupportAgent = require('../models/agent_schema');
const queues = {
  high: [],
  medium: [],
  low: [],
};


const assignTicketToQueue = async (ticket) => {
  
  try {

    // Check ticket priority and category to determine the appropriate agent
    if (ticket.priority === 'high' ) {
      queues.high.push(ticket.Ticketid);
    } else if (ticket.priority === 'medium' ) {
      queues.medium.push(ticket.Ticketid);


      
    } else if (ticket.priority === 'low') {
      queues.low.push(ticket.Ticketid);

      
    }

    console.log('Highqueue:', queues.high);
    console.log('Mediumqueue:', queues.medium);
    console.log('Lowqueue:', queues.low);

    // If no agent is found, assign based on predefined workload distribution
    
  } catch (error) {
    console.error(error);
    throw new Error('Error assigning ticket to queue');
  }
};



// ... (existing code)

// Schedule ticket assignment every 5 minutes

// ... (existing code)

const assignTicketToAgent = async (ticketId, agentType, queue) => {
  try {
    const requiredAgents = await SupportAgent.find({
      agent_type: agentType,
      available: true,
      number_of_assigned_tickets: { $lt: 3 },
    });

    if (requiredAgents.length > 0) {
      const requiredAgentId = requiredAgents[0].userId;
      await Ticket.findOneAndUpdate({ Ticketid: ticketId }, { $set: { assigned_agent: requiredAgentId, status: 'assigned' } });
      await SupportAgent.findOneAndUpdate({ agent_type: agentType }, { $set: { number_of_assigned_tickets: requiredAgents[0].number_of_assigned_tickets + 1 } });
      await queue.pop(ticketId);
    } else {
      await Ticket.findOneAndUpdate({ Ticketid: ticketId }, { $set: { status: 'pending' } });
      if (!queue.includes(ticketId)) {
        queue.push(ticketId);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error assigning ticket to agent');
  }
};

const Assign_Ticket_With_Id_from_queue = async (queues) => {
  try {
    if (queues['high'].length > 0) {
      const ticketId = queues['high'].pop();
      const ticket = await Ticket.findOne({ Ticketid: ticketId }).populate('user assignedAgent');

      if (ticket.issueType === 'Software') {
        await assignTicketToAgent(ticketId, 'Agent 1', queues['high']);
      } else if (ticket.issueType === 'Hardware') {
        await assignTicketToAgent(ticketId, 'Agent 2', queues['high']);
      } else if (ticket.issueType === 'Network') {
         await assignTicketToAgent(ticketId, 'Agent 3', queues['high']);
        
          }
        }
      
    

    // ... (other code)

  } catch (error) {
    console.error(error);
    throw new Error('Error assigning ticket with ID from queue');
  }
};

const createTicket = async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);
    const newTicket = await Ticket.create(req.body);
    console.log('New Ticket:', newTicket);
    await assignTicketToQueue(newTicket);
    await Assign_Ticket_With_Id_from_queue(queues);

    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (existing code)

// Helper function to assign a ticket to an agent



// Create a new ticket



// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific ticket by ID
const getTicketById = async (req, res) => {
  const { Ticketid } = req.params;

  try {
      console.log('Searching for Ticketid:', Ticketid);

      const ticket = await Ticket.findOne({ Ticketid }).populate('user assignedAgent');

      console.log('Found Ticket:', ticket);

      if (!ticket) {
          console.log('Ticket not found');
          return res.status(404).json({ message: 'Ticket not found' });
      }

      res.status(200).json({ ticket });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (ticket) {
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  assignTicketToQueue,
  createTicket,
  getAllTickets,
  getTicketById,
  deleteTicketById,
};