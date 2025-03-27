"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20 text-center bg-gray-50">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">News & Sentiment Analyzer</h1>
      <p className="text-lg text-gray-600 max-w-lg">
        Get summarized news and analyze sentiment with ease.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/news/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          📢 Explore News
        </button>
        <button
          onClick={() => router.push("/sentiment-analysis")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          🔍 Analyze Sentiment
        </button>
      </div>
    </div>
  );
}
