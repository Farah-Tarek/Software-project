const nodemailer = require('nodemailer');
const User = require('../models/userSchema');
const communication = require('../models/communicationSchema');
const Ticket = require('../models/tickets');

// Define the sendMail function
const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'farahts2003@gmail.com',
      pass: 'FTAKS2003'
    }
  });

  const email_Format = {
      user: 'farahts2003@gmail.com',
      from: '',
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(email_Format);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Email Error:', error);
  }
};

// Define the Ticket_Update_Noti function
const Ticket_Update_Noti = async (Ticketid) => {
  try {
    // Find the ticket by its ID
    const ticket = await Ticket.findById(Ticketid).populate('user');

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Check if the ticket has a user associated with it
    if (!ticket.user) {
      throw new Error('Ticket does not have a user associated');
    }

    // Get user details associated with the ticket
    const user = ticket.user;

    // Use the sendMail function to send the email notification
    await sendMail(user.email, 'Ticket Update!', `Your ticket ${ticket._id} has been updated. Status: ${ticket.status}.`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = {
  Ticket_Update_Noti,
  sendMail
};
