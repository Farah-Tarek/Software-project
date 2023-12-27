// AdminCustomizationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const backendUrl = "http://localhost:3000/api"
import ColorSchemeCustomization from './ColorSchemeCustomization.jsx';
import FontStyleCustomization from './FontStyleCustomization.jsx';

const AdminCustomizationFormColor = ({ onUpdate }) => {
  return (
    <div>
      <ColorSchemeCustomization onUpdate={onUpdate} />
      {/* Add other property-specific customization components as needed */}
    </div>
  );
};


export default AdminCustomizationFormColor;
 