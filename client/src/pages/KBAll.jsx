import { useState } from 'react';
import axios from 'axios';

const backend_url = "http://localhost:5173/api/base";

function GetAllKnowledgeBaseEntries() {
  const [entry, setEntry] = useState(null); // State to store a single object
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllEntries = async () => {
    setIsLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.get(`${backend_url}/getAll`);
      setEntry(response.data); // Setting the object returned from the API
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Knowledge Base Entry</h1>
      <button onClick={fetchAllEntries} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Entry'}
      </button>
      {error && <p>Error: {error}</p>}
      {entry ? (
        <div>
          <h2>{entry.title}</h2>
          <p><strong>BaseId:</strong> {entry.BaseId}</p>
          <p><strong>Category:</strong> {entry.CategoryType}</p>
          <p><strong>Questions:</strong> {entry.Questions}</p>
          <p><strong>Solutions:</strong> {entry.Solutions}</p>
        </div>
      ) : (
        !isLoading && <p>No entry found. Click Fetch Entry to try again.</p>
      )}
    </div>
  );
}

export default GetAllKnowledgeBaseEntries;
