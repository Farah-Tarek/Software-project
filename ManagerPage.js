// ManagerPage.js

import React from 'react';

const ManagerPage = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);

  return (
    <div>
      <h2>Manager Page</h2>
      <p>Username: {queryParams.get('username')}</p>
      <p>Email: {queryParams.get('email')}</p>
      <p>Password: {queryParams.get('password')}</p>
    </div>
  );
};

export default ManagerPage;
