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
  placeholder="Enter your full name"
  className="
    w-full p-4 rounded-xl
    border border-gray-300
    text-amber-950 placeholder-gray-500

    transition-all duration-300 ease-out

    focus:outline-none
    focus:border-amber-500

    focus:ring-2 focus:ring-amber-400/40
    focus:shadow-[0_0_0_2px_rgba(251,191,36,0.18)]
  "
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
