const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const userSchema = require('./models/userSchema'); // Import the User schema
const ticketRoutes = require('./routes/ticketRoutes');  
const agentRoutes = require('./routes/agentRoutes');  

require("./database");


// Use ticket routes
// Use ticket routes
app.use('/api/tickets', ticketRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
