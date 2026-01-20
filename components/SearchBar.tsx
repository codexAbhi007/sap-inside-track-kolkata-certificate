"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ onSelect }: any) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/searchParticipants?q=${query}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data));
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-4 rounded-xl border border-gray-300 placeholder-gray-500 text-amber-950 focus:border-amber-700 focus:ring-amber-600 focus:ring-2 focus:outline-none transition-colors"
        placeholder="Enter your full name"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-1 overflow-hidden max-h-52 overflow-y-auto z-20">
          {suggestions.map((p, i) => (
            <li
              key={i}
              className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800"
              onClick={() => {
                onSelect(p);
                setQuery("");
                setSuggestions([]);
              }}
            >
              {p.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
