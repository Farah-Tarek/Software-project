// src/components/UpdateTicket.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateTicket = ({ ticketId }) => {
  const [resolution, setResolution] = useState('');
  const [updateTime, setUpdatedTime] = useState('');

  const handleResolutionChange = (e) => {
    setResolution(e.target.value);
    document.body
  };

  const handleGetTicket = async () => {
    try{
      const response = await axios.get(`/api/tickets/:Ticketid`);
      console.log(response.data.message);

    } catch (error){
      console.error('Error getting ticket:', error);
    }
  }
  const handleUpdateTicket = async () => {
    try {
      const response = await axios.put(`/api/tickets/${ticketId}`, { resolution });
      console.log(response.data.message);
      console.log(`Updating ticket ${ticketId} with resolution: ${resolution}`);
      // You can add additional logic or redirect the user after updating the ticket
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div>
    <h2>Update Ticket #{ticketId}</h2>
    <label gtmlFor="updateTicket">Update Ticket:</label>
    <textarea id="updateTicket" value={updateTime} onChange={(e) => setUpdatedTime(e.target.value)}/>
    <button type="button" onClick={handleUpdateTicket}>Handle Update</button>

    <label htmlFor="resolution">Resolution:</label>
    <textarea
      id="resolution"
      value={resolution}
      onChange={(e) => setResolution(e.target.value)}
    />
    <button type="button" onClick={handleResolutionChange}>Handle Resolution</button>
  </div>
);
};

export default UpdateTicket;
