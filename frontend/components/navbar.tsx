"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setToday(date);
  }, []);

  return (
    <nav className="bg-emerald-950 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/news" className="hover:underline">News</Link>
        <Link href="/sentiment-analysis" className="hover:underline">Sentiment</Link>
      </div>
      <div className="font-semibold">{today}</div>
    </nav>
  );
}
