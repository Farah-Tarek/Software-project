import React, { useState } from 'react';
import axios from 'axios';

const FooterCustomization = ({ adminId, onUpdate }) => {
  const [footerCustomization, setFooter] = useState('');

  const handleCustomization = async () => {
    try {
      const response = await axios.patch(`/api/adminbranding/${adminId}/customize/footerCustomization`, {
        footerCustomization,
      });

      console.log('Footer customized:', response.data);
      onUpdate(); // Update the UI or perform any additional logic after customization
    } catch (error) {
      console.error('Error customizing Footer:', error);

  };
};

  return (
    <div>
      <h2>Footer Customization</h2>
      <div>
        <label>Footer:</label>
        <input type="text" value={footerCustomization} onChange={(e) => setFooter(e.target.value)} />
      </div>
      <button onClick={handleCustomization}>Customize Footer</button>
    </div>
  );
};
export default FooterCustomization;
