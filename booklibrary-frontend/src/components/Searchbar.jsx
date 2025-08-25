import React, { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import "./Searchbar.css";

function SearchBar({ setBooks }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleSearch = async () => {
  if (!query.trim()) return;
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(API_PATHS.SEARCH_BOOKS(query));
    if (!res.ok) throw new Error("Failed to fetch books");
    const data = await res.json();

    setBooks(data.slice(0, 7));

    setQuery(""); 
  } catch (err) {
    console.error("Error searching books:", err);
    setError("Something went wrong. Try again!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default SearchBar;
