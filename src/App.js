// App.jsx
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import AdminCustomizationForm from './AdminCustomizationFormColor.jsx';
import axios from 'axios';
import AdminCustomizationFormColor from './AdminCustomizationFormColor.jsx';
import AdminCustomizationFormStyle from './AdminCustomizationFormStyle.jsx';
import AdminCustomizationFormSize from './AdminCustomizationFormSize.jsx';


const App = (onUpdate) => {
  // Add state or functions to handle updates or other logic

  return (
    <Router>
      <div className="container">
        <h1>Welcome to the Help Desk!</h1>
        <p>Want to try something different?
        </p>
        <h2>Let's Customize!</h2>
        {/* Other content */}

        {/* Link to navigate to customization form */}
        <Link to="/customize/colorScheme">
          <button type="button">Customize Color Scheme</button>
        </Link>

        <Link to="/customize/fontStyle">
            <button type="button">Customize Font Style</button>
        </Link>

        {/* Route to render the customization form */}
        <Routes>
          <Route
            path="/customize/colorScheme"
            element={<AdminCustomizationFormColor onUpdate={onUpdate} />}
          />

            <Route
            path="/customize/fontStyle"
            element={<AdminCustomizationFormStyle onUpdate={onUpdate} />}
          />

            <Route
            path="/customize/fontSize"
            element={<AdminCustomizationFormSize onUpdate={onUpdate} />}
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
