// TicketsForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketsForm = ({userId}) => {
  const [ticketData, setTicketData] = useState({
    user:userId ,
    issueType: '',
    sub_issue: '',
    issue: '',
    priority: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add your logic to create a ticket using a URL endpoint
      const ticketCreationUrl = `http://localhost:3000/api/tickets/tickets?user&issueType=${ticketData.issueType}&sub_issue=${ticketData.sub_issue}&issue=${ticketData.issue}&priority=${ticketData.priority}`;

    const res = await fetch(ticketCreationUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    issueType: ticketData.issueType,
    sub_issue: ticketData.sub_issue,
    issue: ticketData.issue,
    priority: ticketData.priority,
  }),
});


      if (res.status === 201) {
        console.log('Ticket created successfully!');
        // Redirect to the dashboard or wherever you want after creating the ticket
        navigate('/');
      } else {
        console.error('Error creating ticket:', res.statusText);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h2>Create a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Issue Type:
          <input
            type="text"
            name="issueType"
            value={ticketData.issueType}
            onChange={handleChange}
          />
        </label>
        <label>
          Sub Issue:
          <input
            type="text"
            name="sub_issue"
            value={ticketData.sub_issue}
            onChange={handleChange}
          />
        </label>
        <label>
          Issue:
          <input
            type="text"
            name="issue"
            value={ticketData.issue}
            onChange={handleChange}
          />
        </label>
        <label>
          Priority:
          <input
            type="text"
            name="priority"
            value={ticketData.priority}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketsForm;
