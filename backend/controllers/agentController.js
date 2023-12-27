const SupportAgent = require('../models/agent_schema');

// Create a new agent

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await SupportAgent.find();
    res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await SupportAgent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an agent by ID
exports.updateAgentById = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedAgent = await SupportAgent.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an agent by ID
exports.deleteAgentById = async (req, res) => {
  try {
    const deletedAgent = await SupportAgent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
