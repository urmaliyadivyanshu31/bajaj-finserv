import React, { useState } from 'react';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  // Define the validateJSON function
  const validateJSON = (jsonInput) => {
    try {
      const parsed = JSON.parse(jsonInput);
      // Add additional validation logic if necessary
      return true;
    } catch (error) {
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
      // Send POST request to backend
      const res = await fetch('https://bajaj-finserv-kc9u-rk7nsszup-oxdivs-projects.vercel.app/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with your actual API key
        },
        body: JSON.stringify({ data: JSON.parse(jsonInput) }),
      });

      if (!res.ok) {
        console.error('Server Error:', res.statusText);
        setResponse({ error: res.statusText });
        return;
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('API Error:', err);
      setResponse({ error: 'Network error or invalid API response' });
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = response;

    if (dropdownOptions.includes('Alphabets')) {
      filteredResponse = { ...filteredResponse, alphabets: response.alphabets };
    }
    if (dropdownOptions.includes('Numbers')) {
      filteredResponse = { ...filteredResponse, numbers: response.numbers };
    }
    if (dropdownOptions.includes('Highest lowercase alphabet')) {
      filteredResponse = {
        ...filteredResponse,
        highest_lowercase_alphabet: response.highest_lowercase_alphabet,
      };
    }

    return <pre style={{ color: '#333', marginTop: '20px' }}>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          color: '#333',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '600px',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>Your Roll Number</h1>
        <input
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON e.g. {"data": ["A", "C", "z"]}'
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: '#6a11cb',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Submit
        </button>
        {!isValid && (
          <p style={{ color: 'red', marginTop: '10px' }}>Invalid JSON format</p>
        )}
        {response && (
          <>
            <select
              multiple
              onChange={(e) =>
                setDropdownOptions(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
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
    </div>
  );
};

export default App;
