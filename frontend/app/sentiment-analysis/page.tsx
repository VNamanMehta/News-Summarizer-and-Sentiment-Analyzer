"use client";

import { useState } from "react";
import axios from "axios";

interface SentimentResponse {
  sentiment: string;
  polarity: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [sentimentData, setSentimentData] = useState<SentimentResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    if (!text.trim()) {
      setError("Please enter some text for analysis.");
      return;
    }

    setLoading(true);
    setError(null);
    setSentimentData(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/sentiment/analyze-sentiment/`,
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setSentimentData(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  function clearInput() {
    setText("");
    setSentimentData(null);
    setError(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sentiment Analysis
        </h1>

        {/* Textarea Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for sentiment analysis"
          className="border p-2 w-full mb-4 h-24 rounded text-gray-600"
        />

        {/* Button Container */}
        <div className="flex space-x-4 justify-center">
          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            className={`px-4 py-2 rounded ${
              loading || !text.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading || !text.trim()}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {/* Clear Button */}
          <button
            onClick={clearInput}
            className={`px-4 py-2 rounded ${
              !text.trim() && !sentimentData && !error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            disabled={!text.trim() && !sentimentData && !error}
          >
            Clear
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">⚠ {error}</p>}

        {/* Sentiment Result */}
        {sentimentData && (
          <div className="mt-6 border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-gray-800">Sentiment:</h2>
            <p className="text-gray-700">{sentimentData.sentiment}</p>
            <h2 className="font-semibold mt-2 text-gray-800">Polarity Score:</h2>
            <p className="text-gray-700">{sentimentData.polarity}</p>
          </div>
        )}
      </div>
    </div>
  );
}
