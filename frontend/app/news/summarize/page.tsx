"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface NewsArticle {
  summary: string;
  sentiment: { polarity: number; sentiment: string };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SummarizedNews() {
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup function to cancel ongoing request if component unmounts
      setLoading(false);
    };
  }, []);

  async function fetchSummarizedNews() {
    if (!url.trim()) {
      setError("Please enter a valid article URL.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error
    setNews(null); // Clear previous summary

    try {
      const response = await axios.post<NewsArticle>(
        `${API_BASE_URL}/news/summarize/`,
        { url },
        { headers: { "Content-Type": "application/json" } }
      );
      setNews(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearInput() {
    setUrl(""); // Reset input field
    setNews(null); // Clear summary
    setError(null); // Clear error message
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Summarize News Article</h1>

      {/* Input Field */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter article URL"
        className="border p-2 w-full mb-4 rounded"
      />

      {/* Button Container */}
      <div className="flex space-x-4">
        {/* Summarize Button */}
        <button
          onClick={fetchSummarizedNews}
          className={`px-4 py-2 rounded ${
            loading || !url.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading || !url.trim()}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Clear Button */}
        <button
          onClick={clearInput}
          className={`px-4 py-2 rounded ${
            !url.trim() && !news && !error
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
          disabled={!url.trim() && !news && !error}
        >
          Clear
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center mt-4 text-gray-600">Summarizing...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 mt-4">⚠ Error: {error}</p>
      )}

      {/* Display Summarized News */}
      {news && (
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">📝 Summary:</h2>
          <p className="mt-2 text-gray-700">{news.summary}</p>
          <p className="mt-2 text-gray-600">
            <strong>🧐 Sentiment:</strong> {news.sentiment.sentiment}
          </p>
        </div>
      )}
    </div>
  );
}
