import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [advice, setAdvice] = useState('Click the button to get advice!');
  const [adviceId, setAdviceId] = useState(null);

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const { slip } = response.data;
      setAdvice(slip.advice);
      setAdviceId(slip.id);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Failed to fetch advice. Try again.');
    }
  };

  useEffect(() => {
    fetchAdvice(); // Fetch advice on the initial render
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h2>ADVICE #{adviceId || '...'}</h2>
        <p className="advice-text">"{advice}"</p>
        <button onClick={fetchAdvice} className="new-advice-btn">
          Get New Advice
        </button>
      </div>
    </div>
  );
}

export default App;
