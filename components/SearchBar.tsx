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
    <div className="relative  w-75 sm:w-full max-w-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 text-white"
        placeholder="Search your name..."
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-gray-900 shadow-lg rounded overflow-hidden">
          {suggestions.map((p, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                onSelect(p);
                setQuery("");       // clear input
                setSuggestions([]); // close dropdown
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
