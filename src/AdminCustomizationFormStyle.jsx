import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const backendUrl = "http://localhost:3000/api"
import FontStyleCustomization from './FontStyleCustomization.jsx';

const AdminCustomizationFormStyle = ({ onUpdate }) => {
    return (
      <div>
        <FontStyleCustomization onUpdate={onUpdate} />
        {/* Add other property-specific customization components as needed */}
      </div>
    );
  };

  export default AdminCustomizationFormStyle;