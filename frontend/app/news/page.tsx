"use client";

import { useRouter } from "next/navigation";

export default function NewsHome() {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center justify-center mx-auto p-4 text-center max-w-screen min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the News Section</h1>
      <p className="mb-4 text-gray-700">
        Stay updated with the latest trending news or summarize articles of your choice.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => router.push("/news/trending")} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Trending News
        </button>
        <button 
          onClick={() => router.push("/news/summarize")} 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Summarize Article
        </button>
      </div>
    </div>
  );
}
