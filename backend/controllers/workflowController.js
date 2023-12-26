const Workflow = require('../models/workflowSchema');

const getWorkflow = async (req, res) => {
  const { mainIssue, subIssue } = req.query;

  try {
    const workflow = await Workflow.findOne({ mainIssue, subIssue });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    return res.json(workflow.workflow );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });

    console.log('Button clicked!');
    try {
      // ... rest of the code
    } catch (error) {
      console.error('Error fetching workflow:', error);
    }
  }
};

module.exports = { getWorkflow,} ;