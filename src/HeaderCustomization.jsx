// src/components/ColorSchemeCustomization.js
import React, { useState } from 'react';
import axios from 'axios';

const HeaderCustomization = ({ adminId, onUpdate }) => {
  const [headerCustomization, setHeader] = useState('');

  const handleCustomization = async () => {
    try {
      const response = await axios.patch(`/api/adminbranding/${adminId}/customize/headerCustomization`, {
        headerCustomization,
      });

      console.log('Header customized:', response.data);
      onUpdate(); // Update the UI or perform any additional logic after customization
    } catch (error) {
      console.error('Error customizing Header:', error);
    }
  };

  return (
    <div>
      <h2>Header Customization</h2>
      <div>
        <label>Header:</label>
        <input type="text" value={headerCustomization} onChange={(e) => setHeader(e.target.value)} />
      </div>
      <button onClick={handleCustomization}>Customize Header</button>
    </div>
  );
};

export default HeaderCustomization;
