import { useState } from 'react';
import axios from 'axios';

let backend_url = "http://localhost:5173/api/base";

function DeleteByObjectId() {
    const [objectId, setObjectId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleObjectIdChange = (e) => {
      setObjectId(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      // Confirmation before deletion
      if (!window.confirm(`Are you sure you want to delete the entry with Object ID: ${objectId}?`)) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.delete(`${backend_url}/delete/${objectId}`);
        setResult(response.data); // You can adjust this depending on what your API returns on deletion
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="objectId">Enter Object ID to Delete:</label>
          <input 
            type="text" 
            id="objectId" 
            value={objectId} 
            onChange={handleObjectIdChange} 
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>Delete</button>
        </form>
  
        {error && <p>Error: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {result && <p>Deletion successful: {JSON.stringify(result)}</p>}
      </div>
    );
}

export default DeleteByObjectId;
