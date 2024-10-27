"use client";

import { useState, useEffect } from "react";

interface Joke {
  value: string;
  id: string;
  created_at: string;
}

export default function Home() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }
      const data = await response.json();
      setJoke(data);
    } catch {
      setError("Failed to load joke. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Chuck Norris&apos; Facts Generator</h1>
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
            aria-label="Refresh joke"
          >
            <svg
              className={`w-5 h-5 text-gray-600 ${loading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              <p className="text-lg text-gray-800">{joke?.value}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(joke?.created_at || "").toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
