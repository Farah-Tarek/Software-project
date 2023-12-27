const bcrypt = require('bcrypt');
const User = require('../models/userSchema'); // Your user model
const SupportAgent = require('../models/agent_schema'); // Your support agent model
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const smtpapi = require('smtpapi');
const mongoose = require('mongoose');


const getUserProfile = async (req, res) => {
	// We will fetch user profile either with username or userId
	// query is either username or userId
	const { query } = req.params;

	try {
		let user;

		// query is userId
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
			// query is username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if (!user) return res.status(404).json({ error: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
};


async function registerUser(req, res) {
  try {
    const uniqueId = mongoose.Types.ObjectId(); // Manually generate a unique ObjectId
    const { firstname, lastname, userid, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      userid:uniqueId,
      password: hashedPassword,
      email,
      role: "user",
    });

    const savedUser = await newUser.save();

    await logBackup('user', 'create', savedUser._id, savedUser.toObject());

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function Manager_registerUser(req, res) {
  try {
    const uniqueId = mongoose.Types.ObjectId(); // Manually generate a unique ObjectId
    const { firstname, lastname, userid, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      userid:uniqueId,
      password: hashedPassword,
      email,
      role,
    });

    const savedUser = await newUser.save();

    await logBackup('user', 'create', savedUser._id, savedUser.toObject());

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { firstname, lastname, password, email, role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    await logBackup('user', 'update', updatedUser._id, updatedUser.toObject());

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function loginUser(req, res) {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
      
//     } else {
//       res.status(401).json({ error: 'Invalid password' });
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = {
        userId: user._id,
        email: user.email
      };
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_A_JWT_SECRET_KEY';

      jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
        await User.updateOne({ _id: user._id }, {
          $set: { token }
        });
        user.save();

              if (err) {
          console.error('Error creating JWT:', err);
          return res.status(500).json({ error: 'Error creating token' });
        }

        await User.updateOne({ _id: user._id }, {
          $set: { token }
        });
        await sendMFASecretEmail(email);

        return res.status(200).json({
          user: { id: user._id, email: user.email, fullName: user.fullName },
          token
        });
      });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}




// const logoutUser = (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 1 });
// 		res.status(200).json({ message: "User logged out successfully" });
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 		console.log("Error in signupUser: ", err.message);
// 	}
// };


async function logBackup(collectionName, action, documentId, data) {
    try {
      const backupCollection = mongoose.connection.db.collection('backupCollection');
  
      const backupDocument = {
        collectionName,
        action,
        documentId,
        data,
        timestamp: new Date(),
      };
  
      await backupCollection.insertOne(backupDocument);
    } catch (error) {
      console.error('Error logging backup:', error);
      // Handle the error as needed (log, throw, etc.)
    }
  }

async function isMFAcorrect(req, res) {
  try {
    const mfa = req.body.secret;
    const userId = req.params.userId;
console.log('UserId',userId,mfa);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.mfa.secret) {
      return res.status(401).json({ error: 'MFA not set up for this user' });
    }

    if (user.mfa.secret === mfa) {
      res.status(201).json({ message: 'MFA correct' });
    } else {
      res.status(401).json({ error: 'Invalid MFA code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const senderEmail = '27x7HelpDeskProject@gmail.com';
const senderPassword = 'cwvu xuqx bzbl ydjg';

async function sendMFASecretEmail(userEmail) {
  const user = await User.findOne({ email: userEmail });
  const mfaSecret = generateMFASecret();

  await User.updateOne({ email: userEmail }, { $set: { 'mfa.secret': mfaSecret } });

  try {
    console.log('Preparing to send MFA secret email to:', userEmail);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: userEmail,
      subject: 'Your MFA Secret for YourAppName',
      text: `Your MFA secret for enabling Multi-Factor Authentication is: ${mfaSecret}`,
    };

    console.log('Sending email with options:', mailOptions);

    await transporter.sendMail(mailOptions);

    console.log('MFA secret email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending MFA secret email:', error);
  }
}

async function enableMFA(req, res) {
  try {
    const Id = req.params.userId;
    const user = await User.findOne({ userid: Id });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid user credentials' });
    }

    const updatedUser = await User.updateOne({ userid:Id  }, { $set: { 'mfa.enabled': true } });

    await sendMFASecretEmail(user.email);

    res.json({ message: 'MFA enabled successfully. Check your email for the MFA secret.' });
  } catch (error) {
    console.error('Error enabling MFA:', error);
    res.status(500).json({ error: error.message });
  }
}


async function disableMFA(req, res) {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { 'mfa.enabled': false, 'mfa.secret': null, 'mfa.recoveryCodes': [] },
      { new: true }
    );

    res.json({ message: 'MFA disabled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function generateMFASecret() {
  const secret = speakeasy.generateSecret({ length: 20 }).base32;
  return secret;
}

async function createAgent(req, res) {
  try {
    const { userId, agent_type, major } = req.body;

    const user = await User.findOne({ userid: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newAgent = new SupportAgent({
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      userpassword: user.password,
      email: user.email,
      rating: 0,
      number_of_assigned_tickets: 0,
      available: true,
      role: 'supportagent',
      major,
      agent_type,
    });

    const savedAgent = await newAgent.save();

    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const getAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.params.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: 'All notification marked as read',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error in notification',
      success: false,
      error,
    });
  }
};


const get_all_unread_notification = async (req,res) => {
    try{
        const user = await User.findOne({ userid: req.params.userId });
        const notify = user.notifcation;
        if(notify){
            res.status(200).json(notify);
        }
    } catch(error){
        res.staus(500).send({message:' no notifications'})  

    }
}


const get_all_read_notification = async (req,res) => {
    try{
        const user = await User.findOne({ userid: req.params.userId });
        const notify = user.seennotification;
        if(notify){
            res.status(200).json(notify);
        }
    } catch(error){
        res.staus(500).send({message:' no notifications'})  

    }
}

const getUser = async (req, res) => {
  try {
    const users = await User.find();

    const usersData = users.map(user => ({
      email: user.email,
      firstname: user.firstname,
      receiverId: user._id,
    }));

    res.status(200).json(usersData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const getUser = async (req, res) => {
//   try {
//     const users = await User.find();

//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };






// Example backend route handling for /api/users/profile
const profile = async (req, res) => {
  const userId = req.params.userId; // Extract user ID from request parameters

  // Use the extracted user ID in the Mongoose query
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  registerUser,
  updateUser,
  loginUser,
  enableMFA,
  disableMFA,
  generateMFASecret,
  createAgent,
  isMFAcorrect,
  getAllNotificationController,
  logBackup,
  get_all_unread_notification,
  get_all_read_notification,
  getUser,
  profile,
  getUserProfile,
};
