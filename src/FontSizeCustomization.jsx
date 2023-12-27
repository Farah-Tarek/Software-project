// src/components/FontSizeCustomization.js
import React, { useState } from 'react';
import axios from 'axios';

const FontSizeCustomization = ({ adminId, onUpdate }) => {
  const [bodyFontSize, setBodyFontSize] = useState('');
  const [paragraphFontSize, setParagraphFontSize] = useState('');
  const [headerFontSize, setHeaderFontSize] = useState('');

  const handleCustomization = async () => {
    //try {
      //const response = await axios.patch(`/api/adminbranding/${adminId}/customize/fontSize`, {
        //fontSize,
      //});

        document.body.style.fontSize = bodyFontSize || 'Error: invalid size, please try again';
        document.querySelector('p').style.fontSize = paragraphFontSize || 'Error: invalid size, please try again';
        document.querySelectorAll('h1').forEach(h1 => {
            h1.style.fontSize = headerFontSize || 'Error: invalid size, please try again';
          });
          //document.querySelectorAll('p').forEach(p => {
            //p.style.fontSize = paragraphFontSize || '16px';
          //});
      //console.log('Font Size customized:', response.data);
      //onUpdate(); // Update the UI or perform any additional logic after customization
    //} catch (error) {
     // console.error('Error customizing Font Size:', error);
    //}
  };

  return (
    <div>
      <h2>Font Size Customization</h2>
      <div>
        <label htmlFor="headerFontSize"> Header Font Size:</label>
        <input type="number"  id="headerFontSize"
        value={headerFontSize}
        onChange={(e) => setHeaderFontSize(e.target.value)} />
      </div>

      <div>
      <label htmlFor="bodyFontSize">Bodu Font Size:</label>
        <input type="number"  id="bodyFontSize"
        value={bodyFontSize}
        onChange={(e) => setBodyFontSize(e.target.value)} />
      </div>

      <div>
      <label htmlFor="paragraphFontSize">Paragraph Font Size:</label>
        <input type="number"  id="paragraphFontSize"
        value={paragraphFontSize}
        onChange={(e) => setParagraphFontSize(e.target.value)} />
      </div>
    
      <button onClick={handleCustomization}>Customize Font Size</button>
    </div>
  );
};

export default FontSizeCustomization;
