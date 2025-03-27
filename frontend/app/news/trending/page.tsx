"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  summary: string;
  published: string;
  sentiment: { polarity: number; sentiment: string };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TrendingNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController(); // To cancel request on unmount

    async function fetchTrendingNews() {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const response = await axios.get<NewsArticle[]>(
          `${API_BASE_URL}/news/trending/`,
          {
            signal: abortController.signal,
          }
        );
        setNews(response.data);
      } catch (err) {
        if (axios.isCancel(err)) return; // Ignore if request was canceled
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingNews();

    return () => abortController.abort(); // Cleanup function to cancel request on unmount
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trending News</h1>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-600">Fetching latest news...</p>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500">⚠ Error: {error}</p>}

      {/* No News Available */}
      {!loading && !error && news.length === 0 && (
        <p className="text-center text-gray-500">
          No trending news available at the moment.
        </p>
      )}

      {/* News List */}
      <ul>
        {news.map((article, index) => (
          <li key={index} className="mb-6 border-b pb-4 last:border-b-0">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-500 text-sm">
              🗓 Published: {article.published}
            </p>
            <p className="mt-2">{article.summary}</p>
            <p className="mt-2 text-gray-600">
              <strong>🧐 Sentiment:</strong> {article.sentiment.sentiment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
