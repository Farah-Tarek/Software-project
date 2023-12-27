const Conversations = require('../models/Conversations');
const Users = require('../models/userSchema');

 async function createConversation(req, res) {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({ members: [senderId, receiverId] });
    await newConversation.save();
    res.status(200).send('Conversation created successfully');
  } catch (error) {
    console.log('Error creating conversation:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserConversations(req, res) {
    try {
      const userId = req.params.userId;
      const conversations = await Conversations.find({ members: { $in: [userId] } });
      const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
        const receiverId = conversation.members.find((member) => member !== userId);
        try {
          const user = await Users.findById(receiverId);
  
          // Check if user is null or undefined before accessing properties
          if (user) {
            return { user: { receiverId: user._id, email: user.email, firstname: user.firstname }, conversationId: conversation._id };
          } else {
            // Handle the case when user is null or undefined
            console.log('User not found for receiverId:', receiverId);
            return null; // or return some default value
          }
        } catch (error) {
          // Handle errors from Users.findById
          console.error('Error finding user by ID:', error);
          return null; // or return some default value
        }
      }));
  
      console.log('conversationUserData:', conversationUserData); // Log to check the structure of conversationUserData
  
      // Filter out null or undefined values from the array
      const validUserData = conversationUserData.filter(data => data !== null);
  
      res.status(200).json(validUserData);
    } catch (error) {
      console.log('Error getting user conversations:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  

// Other conversation-related actions
// Implement other actions as needed

module.exports = {
  createConversation,
  getUserConversations,
  // Export other actions as needed
};
