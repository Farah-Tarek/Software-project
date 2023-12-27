const { MongoClient } = require('mongodb');
const cron = require('node-cron');


// Replace these values with your MongoDB connection details
const sourceUri = 'mongodb://127.0.0.1:27017/newtest1';
const destinationUri = 'mongodb://127.0.0.1:27017/backupDatabase';



async function performBackupAndRestore() {
  const sourceClient = new MongoClient(sourceUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const destinationClient = new MongoClient(destinationUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await sourceClient.connect();
    await destinationClient.connect();

    const sourceDb = sourceClient.db();
    const destinationDb = destinationClient.db();

    // Get a list of collection names
    const collectionNames = await sourceDb.listCollections().toArray();

    for (const { name } of collectionNames) {
      const sourceCollection = sourceDb.collection(name);
      const destinationCollection = destinationDb.collection(name);

      // Fetch all documents from the source collection
      const documents = await sourceCollection.find().toArray();

      for (const document of documents) {
        // Check if the document already exists in the destination collection
        const existingDocument = await destinationCollection.findOne({ _id: document._id });

        if (!existingDocument) {
          // Insert the document into the destination collection
          await destinationCollection.insertOne(document);
          console.log(`Copied data from ${name} collection.`);
        } else {
          console.log(`Document with _id ${document._id} already exists in ${name} collection. Skipping.`);
        }
      }
    }

    console.log('Backup and restore completed successfully.');
  } finally {
    await sourceClient.close();
    await destinationClient.close();
  }
}

// Execute the backup and restore



module.exports = {
  performBackupAndRestore,
};
