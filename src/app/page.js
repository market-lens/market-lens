"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Page() {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://e9o7l3ryxg.execute-api.us-east-2.amazonaws.com/prod/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}`,
        {
          params: { adjusted: "true", sort: "asc" },
          headers: { "Content-Type": "application/json" },
        }
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to Market Lens</h1>
      <p className="text-xl mb-8">Your go-to app for stock data fetching and analysis.</p>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Ticker"
          required
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-white text-blue-500 font-semibold rounded"
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {data && (
        <div className="mt-8 w-full max-w-lg bg-white text-black p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}