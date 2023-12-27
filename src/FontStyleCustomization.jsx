// src/components/FontStyleCustomization.js
import React, { useState } from 'react';
import axios from 'axios';
//import './FontStyleCustomization.css';
import './App.css';

const FontStyleCustomization = ({ onUpdate }) => {
  const [pageFontStyle, setPageFontStyle] = useState('');
  const [buttonFontStyle, setButtonFontStyle] = useState('');
  

  const handleCustomization = async () => {
    //try {
      //const response = await axios.put(`/api/adminbranding/${adminId}/customize/fontStyle`, {
        //fontStyle,
      //});

      //onUpdate();

      document.body.style.fontFamily = pageFontStyle || 'Error: invalid style, please try again';
      document.querySelectorAll('button').forEach(button => {
        button.style.fontFamily = buttonFontStyle || 'Arial, sans-serif';
      });

      //console.log('Font Style customized:', response.data);
      //onUpdate(); // Update the UI or perform any additional logic after customization
    //} catch (error) {
      //console.error('Error customizing Font Style:', error);
    //}
  };

  return (
    <div className="font-style-customization">
      <h2>Font Style Customization</h2>
      <div>
      <label htmlFor="pageFontStyle">Page Font Style:</label>
        <input type="text"  id="pageFontStyle"
        value={pageFontStyle}
        onChange={(e) => setPageFontStyle(e.target.value)} />
      </div>

      <div>
      <label htmlFor="buttonFontStyle">Button Font Style:</label>
        <input type="text"  id="buttonFontStyle"
        value={buttonFontStyle}
        onChange={(e) => setButtonFontStyle(e.target.value)} />
      </div>
      <button onClick={handleCustomization}>Customize Font Style</button>
     
    </div>
  );
};

export default FontStyleCustomization;
