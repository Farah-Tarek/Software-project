import  { useState } from "react";
import axios from "axios";
//let backend_url = "http://localhost:5173/api";

const AddKnowledgeItem = () => {
  const [inputValue, setInputValue] = useState({
    BaseId: "",
    title: "",
    CategoryType: "",
    Questions: "",
    Solutions: "",
  });

  const { BaseId, title, CategoryType, Questions, Solutions } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5173/api/base/enter/insertbase`, {
        ...inputValue,
      });
      console.log(response.data);
      // Handle additional success actions
    } catch (error) {
      console.error('Error adding knowledge item:', error);
      // Handle error
    }
  };

  return (
    <div className="form_container">
      <h2>Add Knowledge Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="BaseId">Base ID</label>
          <input
            type="number"
            name="BaseId"
            value={BaseId}
            placeholder="Enter the Base ID"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter the title"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="CategoryType">Category Type</label>
          <select name="CategoryType" value={CategoryType} onChange={handleOnChange}>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
          </select>
        </div>
        <div>
          <label htmlFor="Questions">Questions</label>
          <textarea
            name="Questions"
            value={Questions}
            placeholder="Enter the question"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="Solutions">Solutions</label>
          <textarea
            name="Solutions"
            value={Solutions}
            placeholder="Enter the solution"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddKnowledgeItem;
