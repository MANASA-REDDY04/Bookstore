import React, { useState, useEffect } from "react";
import BookCard from "./BookCard.jsx";
import SearchBar from "./Searchbar.jsx";
import { API_PATHS } from "../utils/apiPaths.js";
import "./Dashboard.css";

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(API_PATHS.GET_BOOKS)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="dashboard">
      <SearchBar setBooks={setBooks} />
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found. Try searching!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
