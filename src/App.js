import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ticker, setTicker] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);

  const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}`,
        {
          params: { adjusted: 'true', sort: 'asc', limit: 120, apiKey: API_KEY },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Stock Data Fetcher</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticker Symbol"
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
        <button type="submit">Fetch Data</button>
      </form>
      {data && (
        <div>
          <h2>Results for {ticker.toUpperCase()}</h2>
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