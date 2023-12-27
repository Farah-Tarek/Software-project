// src/components/ColorSchemeCustomization.js
import React, { useState } from 'react';
import axios from 'axios';

const OrganizationNameCustomization = ({ adminId, onUpdate }) => {
  const [organizationName, setOrgName] = useState('');

  const handleCustomization = async () => {
    try {
      const response = await axios.patch(`/api/adminbranding/${adminId}/customize/organizationName`, {
        organizationName,
      });

      console.log('Organization Name customized:', response.data);
      onUpdate(); // Update the UI or perform any additional logic after customization
    } catch (error) {
      console.error('Error customizing Organization Name:', error);
    }
  };

  return (
    <div>
      <h2>Organization Name Customization</h2>
      <div>
        <label>Organization Name:</label>
        <input type="text" value={organizationName} onChange={(e) => setOrgName(e.target.value)} />
      </div>
      <button onClick={handleCustomization}>Customize Organization Name</button>
    </div>
  );
};

export default OrganizationNameCustomization;
