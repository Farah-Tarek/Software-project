const userModel = require("../models/userSchema");
const SupportAgent = require('./models/agent_schema');

const userController = {
    register: async (req, res) => {
        try {
            const { email, password, displayName, role } = req.body;

            // Check if the user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            // Create a new user
            const newUser = new userModel({
                email,
                password,
                displayName,
                role,
            });

            // Save the new user to the database
            await newUser.save();

            res.status(200).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = userController;