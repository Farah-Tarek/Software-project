const bcrypt = require('bcrypt');
const Ticket = require('../models/tickets'); // Your ticket model
const SupportAgent = require('../models/agent_schema');
const User = require('../models/userSchema');
const message = require('../models/Messages');
const SubIssue = require('../models/sub_issues');
const nodemailer = require('nodemailer');




const Notification = require('../models/notification');

const mongoose = require('mongoose');

const queues = {
  high: [],
  medium: [],
  low: [],
};


const startTicketAssignmentInterval = () => {
  // Set the interval for ticket assignment (e.g., every 2 minutes)
  const intervalInMinutes = 15;

  // Convert minutes to milliseconds
  const intervalInMilliseconds = intervalInMinutes * 60 * 1000;

  // Set up an interval to run the assignment logic
  setInterval(async () => {
    try {
      // Get all agents with less than 3 assigned tickets
      Assign_Ticket_With_Id_from_queue(queues);
      
    } catch (error) {
      console.error('Error assigning tickets:', error);
    }
  }, intervalInMilliseconds);
};



async function assignTicketToQueue(ticket) {
  try {
    if (ticket.priority === 'high') {
      queues.high.push(ticket.Ticketid);
    } else if (ticket.priority === 'medium') {
      queues.medium.push(ticket.Ticketid);
    } else if (ticket.priority === 'low') {
      queues.low.push(ticket.Ticketid);
    }

    console.log('Highqueue:', queues.high);
    console.log('Mediumqueue:', queues.medium);
    console.log('Lowqueue:', queues.low);
  } catch (error) {
    console.error(error);
    throw new Error('Error assigning ticket to queue');
  }
}

async function assignTicketToAgent(ticketId, agentType, queue) {
  try {
    const ticket =  await Ticket.findOne({ Ticketid: ticketId });
    const user =  await User.findOne({ _id: ticket.user});

    const requiredAgent = await SupportAgent.findOneAndUpdate({
      agent_type: agentType,
      available: true,
      number_of_assigned_tickets: { $lt: 5 },
    }, { $inc: { number_of_assigned_tickets: 1 } });

    if (requiredAgent) {
      await Ticket.findOneAndUpdate({ Ticketid: ticketId }, { $set: { assignedAgent: requiredAgent.userId, status: 'Pending' } });
      await queue.shift();

      const assignedAgent = await SupportAgent.findOne({ userId: requiredAgent.userId });
      await createNotification(user.userid, 'Ticket Assigned', `Your ticket has been assigned to ${assignedAgent.name}`);
    } else {
      await Ticket.findOneAndUpdate({ Ticketid: ticketId }, { $set: { status: 'open' } });
      if (!queue.includes(ticketId)) {
        queue.push(ticketId);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error assigning ticket to agent');
  }
}


async function Assign_Ticket_With_Id_from_queue(queues) {
  try {
    const assignToAgent = async (ticketId, agentOptions, queue, ticket) => {
      for (const agentType of agentOptions) {
        await assignTicketToAgent(ticketId, agentType, queue);
        const updatedTicket = await Ticket.findOne({ Ticketid: ticketId }).populate('user assignedAgent');
        if (updatedTicket.status === 'Pending') {
          break;
        }
      }
    };

    const processQueue = async (priorityQueue, agentOptions) => {
      if (priorityQueue.length > 0) {
        const ticketId = priorityQueue[0];
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
}

const logBackup = async (ticketId) => {
  try {
    const ticket = await Ticket.findOne({ Ticketid: ticketId });
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const backupCollection = mongoose.connection.db.collection('backupCollection');
    const backupDocument = {
      collectionName: 'ticket',
      ticketId,
      ticket: ticket.toObject(), // Store the entire document
      timestamp: new Date(),
    };

    await backupCollection.insertOne(backupDocument);
  } catch (error) {
    console.error(error);
    throw new Error('Error logging backup');
  }
};

const createSub_issue = async (_id, issueType, sub_issue, res) => {
  try {
    const newSubIssue = new SubIssue({
      Ticketid: _id,
      issueType: issueType,
      sub_issues: sub_issue,
    });

    const saved_sub_issue = await newSubIssue.save();

    res.json(saved_sub_issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// const createTicket = async (req, res) => {
//   try {
//     const uniqueId = mongoose.Types.ObjectId(); // Manually generate a unique ObjectId

//     const userid = req.body.user;
//     const sub_issue = req.body.sub_issue;
//     const ticketData = { ...req.body };
//     delete ticketData.sub_issue;

//     const user = await User.findOne({ _id: userid });
//     console.log('Incoming Request Body:', req.body);

//     const newTicket = await Ticket.create(ticketData);
//     await createSub_issue(newTicket._id, newTicket.issueType, sub_issue, res);
//     await createNotification(user.userid, 'Ticket open', 'Your ticket has been opened.');
    
//     await create_ticket_email(user.email, newTicket._id); // Pass ticketId directly
//     await assignTicketToQueue(newTicket);
//     await logBackup(newTicket.Ticketid, newTicket.toObject());

//     // Ensure response is not already sent
//     if (!res.headersSent) {
//       return res.status(201).json(newTicket);
//     }
//   } catch (error) {
//     console.error(error);
//     if (!res.headersSent) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// };

const createTicket = async (req, res) => {
  try {
    const uniqueId = mongoose.Types.ObjectId(); // Manually generate a unique ObjectId

    const userid = req.body.user;
    const sub_issue = req.body.sub_issue;
    const ticketData = { ...req.body, Ticketid: uniqueId }; // Include Ticketid in the ticketData object
    delete ticketData.sub_issue;

    const user = await User.findOne({ _id: userid });
    console.log('Incoming Request Body:', req.body);

    const newTicket = await Ticket.create(ticketData);
    await createSub_issue(newTicket._id, newTicket.issueType, sub_issue, res);
    await createNotification(user.userid, 'Ticket open', 'Your ticket has been opened.');
    
    await create_ticket_email(user.email, newTicket._id); // Pass ticketId directly
    await assignTicketToQueue(newTicket);
    await logBackup(newTicket.Ticketid, newTicket.toObject());

    // Ensure response is not already sent
    if (!res.headersSent) {
      return res.status(201).json(newTicket);
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};





const updateTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findOne({ Ticketid: id });
    const user = await User.findOne({ _id: ticket.user });


    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Capture the original ticket data
    const originalTicketData = ticket.toObject();

    // Assuming req.body contains the fields to be updated (e.g., resolution, status, etc.)
    const updateFields = req.body;

    // If the resolution is provided, set the status to "closed"
    if (updateFields.resolution) {
      updateFields.status = 'closed';
      
      // Create notification when ticket is closed
    }

    // Update the ticket with resolution, status, and updatedTime
    const updatedTicket = await Ticket.findOneAndUpdate(
      { Ticketid: id },
      { $set: { ...updateFields, updatedTime: Date.now() } },
      { new: true } // This option returns the modified document
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Create notification when ticket is updated
    await createNotification(user.userid, 'Ticket Updated', 'Your ticket has been closed.');
     await closed_ticket_email(user.email,updateTicket.ticketId);

    // Log ticket update to backup with both original and updated data
    await logBackup(id, { originalTicket: originalTicketData, updatedFields: updatedTicket.toObject() });

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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


const createNotification = async (userId, message) => {
  try {
    const user = await User.findOne({ userid: userId });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    user.notifcation.push({
      message,
    });

    const updatedUser = await user.save();

    return { success: true, message: 'Notification created successfully', data: updatedUser };
  } catch (error) {
    console.error('Error creating notification:', error);
    return { success: false, message: 'Error in notification', error };
  }
};


const senderEmail = '27x7HelpDeskProject@gmail.com';
const senderPassword = 'cwvu xuqx bzbl ydjg';


async function closed_ticket_email(userEmail,ticketId) {
  const user = await User.findOne({ email: userEmail });
  const ticket = await User.findOne({ Ticketid: ticketId });


  await User.findOne({ email: userEmail });

  try {
    console.log('Preparing to send notify email to:', userEmail);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: userEmail,
      subject: 'About your ticket',
      text: `our support agent answered your ticket  ${ticket.resolution}` ,
    };

    console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    console.log(' email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending  email:', error);
  }
}

const create_ticket_email = async (userEmail, ticketId) => {
  const user = await User.findOne({ email: userEmail });
  const ticket = await Ticket.findOne({ _id: ticketId });

  try {
    console.log('Preparing to send notify email to:', userEmail);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: userEmail,
      subject: 'About your ticket',
      text: `Your ticket has been created ${JSON.stringify(ticket)}`,
    };

    console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};





startTicketAssignmentInterval();

module.exports = {
  assignTicketToQueue,
  createTicket,
  updateTicket,
  getAllTickets,
  getTicketById,
  deleteTicketById,
  createSub_issue,
};
