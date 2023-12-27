import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkflowSelector = () => {
  const [mainIssue, setMainIssue] = useState(''); // State for selected mainIssue
  const [subIssue, setSubIssue] = useState('');   // State for selected subIssue
  const [workflow, setWorkflow] = useState('');    // State to store retrieved workflow

  const handleMainIssueChange = (event) => {
    setMainIssue(event.target.value);
  };

  const handleSubIssueChange = (event) => {
    setSubIssue(event.target.value);
  };

  const getWorkflow = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/workflow/workflow?mainIssue=${mainIssue}&subIssue=${subIssue}`);
      setWorkflow(response.data);
    } catch (error) {
      console.error('Error fetching workflow:', error);
    }
  };

  // Trigger the workflow retrieval when mainIssue or subIssue changes
  useEffect(() => {
    if (mainIssue && subIssue) {
      getWorkflow();
    }
  }, [mainIssue, subIssue]);

  return (
    <div>
      <h1>Workflow Selector</h1>
      <div>
        <label>Main Issue:</label>
        <select value={mainIssue} onChange={handleMainIssueChange}>
          <option value="">Select Main Issue</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
        </select>
      </div>
      <div>
        <label>Sub Issue:</label>
        <select value={subIssue} onChange={handleSubIssueChange}>
          <option value="">Select Sub Issue</option>
          {/* You can dynamically populate sub-issues based on the selected mainIssue */}
          {mainIssue === 'Hardware' && (
            <>
              <option value="Desktops">Desktops</option>
              <option value="Laptops">Laptops</option>
              <option value="Printers">Printers</option>
              <option value="Servers">Servers</option>
              <option value="Networking Equipment">Networking Equipment</option>
              {/* Add other hardware sub-issues as needed */}
            </>
          )}
          {mainIssue === 'Software' && (
            <>
              <option value="Operating System">Operating System</option>
              <option value="Application Software">Application Software</option>
              <option value="Custom Software">Custom Software</option>
              <option value="Integration Issues">Integration Issues</option>
              {/* Add other software sub-issues as needed */}
            </>
          )}
          {mainIssue === 'Network' && (
            <>
              <option value="Email Issues">Email Issues</option>
              <option value="Internet Connection Problems">Internet Connection Problems</option>
              <option value="Website Errors">Website Errors</option>
              {/* Add other network sub-issues as needed */}
            </>
          )}
        </select>
      </div>
      {/* <button onClick={getWorkflow}>Get Workflow</button> */}

      {workflow && (
        <div>
          <h2>Workflow Details</h2>
          <ul>
            {Object.entries(workflow).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkflowSelector;
