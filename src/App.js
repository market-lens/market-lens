import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Submitting form with:', { ticker, startDate, endDate });

    try {
      const response = await axios.get(
        `https://e9o7l3ryxg.execute-api.us-east-2.amazonaws.com/prod/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}`,
        {
          params: { adjusted: 'true', sort: 'asc' },
        }
      );
      console.log('API Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Stock Data Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && data.results && (
        <div>
          {data.results.map((item) => (
            <div key={item.t}>
              <p>Date: {new Date(item.t).toLocaleDateString()}</p>
              <p>Open: {item.o}</p>
              <p>High: {item.h}</p>
              <p>Low: {item.l}</p>
              <p>Close: {item.c}</p>
              <p>Volume: {item.v}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;