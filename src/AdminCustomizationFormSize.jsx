import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const backendUrl = "http://localhost:3000/api"
import FontSizeCustomization from './FontSizeCustomization.jsx';

const AdminCustomizationFormSize = ({ onUpdate }) => {
    return (
      <div>
        <FontSizeCustomization onUpdate={onUpdate} />
        {/* Add other property-specific customization components as needed */}
      </div>
    );
  };

  export default AdminCustomizationFormSize;