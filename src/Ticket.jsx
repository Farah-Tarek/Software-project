import React from 'react';

const Ticket = ({ ticket }) => {
    const { id } = ticket.params;
  return (
    <div>
      <h2>Ticket <div id={id}></div></h2>
      <p>Status: {ticket.status}</p>
      <p>Description: {ticket.description}</p>
      {/* Display other ticket details */}
    </div>
  );
};

export default Ticket;
