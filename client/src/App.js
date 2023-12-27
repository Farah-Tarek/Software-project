import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form';
import MFAForm from './modules/MFAForm';
import TicketForm from './modules/TicketForm';


const App = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={localStorage.getItem('user:token') !== null ? <Dashboard /> : <Navigate to="/users/sign_in" />}
      />
      <Route path="/users/sign_in" element={<Form isSignInPage={true} />} />
      <Route path="/users/sign_up" element={<Form isSignInPage={false} />} />
      <Route
        path="/mfa-verification"
        element={localStorage.getItem('user:token') !== null ? <MFAForm  /> : <Navigate to="/users/sign_in" />}
      />
      <Route path="/tickets/create" element={localStorage.getItem('user:token')!==null?<TicketForm />:<Navigate to="/users/sign_in" />}
      />
    </Routes>
  );
};

export default App;
