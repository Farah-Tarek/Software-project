import React, { useState, useEffect } from 'react';


const TicketStatusReport = () => {
  const [ticketStatus, setTicketStatus] = useState([]);
  const [resolutionTimeReport, setResolutionTimeReport] = useState([]);
  const [agentPerformanceReport, setAgentPerformanceReport] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports/generate');
      const data = await response.json();

      setTicketStatus(data.ticketStatusReport);
      setResolutionTimeReport(data.resolutionTimeReport);
      setAgentPerformanceReport(data.agentPerformanceReport);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>

      <div>
        <h2>Ticket Status Report</h2>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {ticketStatus.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.tickets.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Resolution Time Report</h2>
        {/* Render your resolution time report table here */}
      </div>

      <div>
        <h2>Agent Performance Report</h2>
        {/* Render your agent performance report table here */}
      </div>
    </div>
  );
};

export default TicketStatusReport;












































/*import React, { useEffect, useRef, useState } from 'react';
import Button from "../../components/Button"
import Input from "../../components/Input"

const Reports = () => {

    useEffect(() => {
        const fetchTicketStatus = async () => {
          const res = await fetch(`http://localhost:3000/api/ticketStatus/${ticket?.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const resData = await res.json();
          setUsers(resData);
        };
        fetchTicketStatus();
      }, []);



      useEffect(() => {
        const fetchAgentPerformance = async () => {
          const res = await fetch(`http://localhost:3000/api/agentPerformance/${agent?.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const resData = await res.json();
          setUsers(resData);
        };
        fetchAgentPerformance();
      }, []);



      useEffect(() => {
        const fetchResolutionTime = async () => {
          const res = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const resData = await res.json();
          setUsers(resData);
        };
        fetchResolutionTime();
      }, []);



};

export default Reports

*/






























// /// Inside a React component
// import { useState, useEffect } from 'react';

// const TicketStatusReport = () => {
//   const [ticketStatusData, setTicketStatusData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend API
//     fetch('/api/reports/ticketStatus')
//       .then((response) => response.json())
//       .then((data) => setTicketStatusData(data))
//       .catch((error) => console.error('Error fetching ticket status data:', error));
//   }, []);

//   // Render the component with the fetched data
//   return (
//     <div>
//       <h2>Ticket Status Report</h2>
//       {/* Render charts or tables using ticketStatusData */}
//     </div>
//   );
// };

// export default TicketStatusReport;
