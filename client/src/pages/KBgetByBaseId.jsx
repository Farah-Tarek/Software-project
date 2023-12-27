import { useState } from 'react';
import axios from 'axios';

let backend_url = "http://localhost:5173/api/base";

function SearchById() {
    const [baseId, setBaseId] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleBaseIdChange = (e) => {
      setBaseId(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
        const response = await axios.get(`${backend_url}/searchbyid/${baseId}`);
        // Assuming the response is an object
        setResult(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="baseId">Enter BaseId:</label>
          <input 
            type="text" 
            id="baseId" 
            value={baseId} 
            onChange={handleBaseIdChange} 
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>Search</button>
        </form>
  
        {error && <p>Error: {error}</p>}
        {isLoading && <p>Loading...</p>}
        {result && (
          <div>
            <h2>Result:</h2>
            <p><strong>BaseId:</strong> {result.BaseId}</p>
            <p><strong>Title:</strong> {result.title}</p>
            <p><strong>Questions:</strong> {result.Questions}</p>
            <p><strong>Solutions:</strong> {result.Solutions}</p>
          </div>
        )}
      </div>
    );
}

export default SearchById;
