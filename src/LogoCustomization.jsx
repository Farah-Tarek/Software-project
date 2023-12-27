// src/components/LogoCustomization.js
import React, { useState } from 'react';
import axios from 'axios';

const LogoCustomization = ({ adminId, onUpdate }) => {
  const [logoUrl, setLogoUrl] = useState('');

  const handleCustomization = async () => {
    //try {
      //const response = await axios.patch(`/api/adminbranding/${adminId}/customize/logoUrl`, {
        //logoUrl,
      //});

      document.body.style.maxWidth = logoUrl || 'helpdesk.jpg';

      //console.log('Logo customized:', response.data);
      //onUpdate(); // Update the UI or perform any additional logic after customization
    //} catch (error) {
      //console.error('Error customizing Logo:', error);
   // }
  };

  return (
    <div>
      <h2>Logo Customization</h2>
      <div>
        <label>Logo URL:</label>
        <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
      </div>
      <button onClick={handleCustomization}>Customize Logo</button>
    </div>
  );
};

export default LogoCustomization;
