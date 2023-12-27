const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Import your models
const User = require('../models/userSchema');
const Ticket = require('../models/tickets');

// Define a generic recovery route
router.post('/recover-data/:type', async (req, res) => {
  const dataType = req.params.type;

  try {
    // Retrieve the latest backup data from the backupCollection
    const backupCollection = mongoose.connection.db.collection('backupCollection');
    const latestBackup = await backupCollection.findOne(
      { collectionName: dataType },
      { sort: { timestamp: -1 } }
    );

    if (!latestBackup) {
      return res.status(404).json({ error: `No backup found for ${dataType}` });
    }

    const recoveredData = latestBackup.ticket;

    // Update or insert the recovered record
    switch (dataType) {
      case 'users':
        await User.findOneAndUpdate({ userId: recoveredData.userId }, { $set: recoveredData }, { upsert: true });
        break;
      case 'ticket':
        await Ticket.findOneAndUpdate({ Ticketid: recoveredData.Ticketid }, { $set: recoveredData }, { upsert: true });
        break;

      // Add more cases for other data types as needed

      default:
        return res.status(400).json({ error: 'Invalid data type' });
    }

    res.status(200).json({ message: `Data recovery successful for ${dataType}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
