// src/components/ColorSchemeCustomization.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Router } from 'express';
//import router from '../../backend/routes/workflowRoutes';

const ColorSchemeCustomization = ({ onUpdate }) => {
  const [colorBackground, setColorBackground] = useState('');
  const [pageColor, setPageColor ] = useState('');
  const [buttonColor, setButtonColor] = useState('');

  const handleCustomization = async () => {
    //try {
     //const response = await axios.patch(`/api/adminbranding/customize/colorScheme`, {
       // colorBackground, pageColor, buttonColor
      //});

     // onUpdate(); // Update the UI or perform any additional logic after customization
     document.body.style.backgroundColor = colorBackground || 'Error: invalid color was entered, please try again';
      document.querySelector('.container').style.backgroundColor = pageColor || 'Error: invalid color was entered, please try again';
      document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = buttonColor || 'Error: invalid color was entered, please try again ';
      });
      //console.log('Color Scheme customized:', response.data);
     // onUpdate(); // Update the UI or perform any additional logic after customization
    //} catch (error) {
      //console.error('Error customizing Color Scheme:', error);
    //}
  };

  return (
    <div className="color-scheme-customization">
      <h2>Color Scheme Customization</h2>
      <div>
        <label htmlFor="colorBackground">Background Color:</label>
        <input
          type="text"
          id="colorBackground"
          value={colorBackground}
          onChange={(e) => setColorBackground(e.target.value)}
        />
      </div>
      <div>
      <label htmlFor="pageColor">Page Color:</label>
        <input
          type="text"
          id="pageColor"
          value={pageColor}
          onChange={(e) => setPageColor(e.target.value)}
        />
      </div>
      <div>
      <label htmlFor="buttonColor">Button Color:</label>
        <input
          type="text"
          id="buttonColor"
          value={buttonColor}
          onChange={(e) => setButtonColor(e.target.value)}
        />
      </div>
      {/* Add more input fields for other properties */}
      <button onClick={handleCustomization}>Customize Color Scheme</button>
    </div>
  );
};

export default ColorSchemeCustomization;
