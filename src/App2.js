// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import UpdateTicket from './UpdateTicket.jsx';
import Ticket from './Ticket.jsx';

const App = ({onUpdate}) => {
  return (
    <Router>
      <div>
        <h1>Support Ticket System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/tickets/:id">Tickets</Link>
            </li>
            {/* Add other navigation links */}
          </ul>
        </nav>

          {/* Other routes */}
          <Routes>
          <Route
            path="/tickets/:id" component={Ticket} element={<UpdateTicket onUpdate={onUpdate} />} />
            <Route path="/tickets/:id" component={UpdateTicket} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
