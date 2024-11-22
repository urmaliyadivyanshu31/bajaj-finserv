import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJSON(jsonInput)) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    try {
      const res = await fetch("https://mybajaj-itz5rd9sd-oxdivs-projects.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonInput,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredResponse = response;

    if (dropdownOptions.includes("Alphabets")) {
      filteredResponse = { ...filteredResponse, alphabets: response.alphabets };
    }
    if (dropdownOptions.includes("Numbers")) {
      filteredResponse = { ...filteredResponse, numbers: response.numbers };
    }
    if (dropdownOptions.includes("Highest lowercase alphabet")) {
      filteredResponse = {
        ...filteredResponse,
        highest: response.highestLowercase,
      };
    }
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON e.g. {"data": ["A", "C", "z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {!isValid && <p style={{ color: "red" }}>Invalid JSON format</p>}
      {response && (
        <>
          <select
            multiple
            onChange={(e) =>
              setDropdownOptions(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default App;
