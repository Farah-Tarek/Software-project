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
    const assignToAgent = async (ticketId, agentOptions, queue, ticket) => {
      for (const agentType of agentOptions) {
        await assignTicketToAgent(ticketId, agentType, queue);
        const updatedTicket = await Ticket.findOne({ Ticketid: ticketId }).populate('user assignedAgent');
        if (updatedTicket.status === 'assigned') {
          break; // Exit the loop if the ticket is successfully assigned
        }
      }
    };

    const processQueue = async (priorityQueue, agentOptions) => {
      if (priorityQueue.length > 0) {
        const ticketId = priorityQueue[priorityQueue.length - 1];
        const ticket = await Ticket.findOne({ Ticketid: ticketId }).populate('user assignedAgent');

        switch (ticket.issueType) {
          case 'Software':
            await assignToAgent(ticketId, agentOptions.software, priorityQueue, ticket);
            break;
          case 'Hardware':
            await assignToAgent(ticketId, agentOptions.hardware, priorityQueue, ticket);
            break;
          case 'Network':
            await assignToAgent(ticketId, agentOptions.network, priorityQueue, ticket);
            break;
          default:
            throw new Error('Invalid issueType');
        }
      }
    };

    // Define agent options for each priority level
    const agentOptionshigh = {
      software: ['Agent 1'],
      hardware: ['Agent 2'],
      network: ['Agent 3'],
    };

    const agentOptionsmedium = {
      software: ['Agent 1', 'Agent 2'],
      hardware: ['Agent 2', 'Agent 3'],
      network: ['Agent 3', 'Agent 1'],
    };

    const agentOptionslow = {
      software: ['Agent 1', 'Agent 2', 'Agent 3'],
      hardware: ['Agent 2', 'Agent 3', 'Agent 1'],
      network: ['Agent 3', 'Agent 1', 'Agent 2'],
    };

    await processQueue(queues.high, agentOptionshigh);
    await processQueue(queues.medium, agentOptionsmedium);
    await processQueue(queues.low, agentOptionslow);

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