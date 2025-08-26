import React, { useState, useEffect } from "react";
import BookCard from "./BookCard.jsx";
import SearchBar from "./Searchbar.jsx";
import { API_PATHS } from "../utils/apiPaths.js";
import "./Dashboard.css";

const quotes = [
  "A reader lives a thousand lives before he dies. – George R.R. Martin",
  "So many books, so little time. – Frank Zappa",
  "A room without books is like a body without a soul. – Cicero",
  "Books are a uniquely portable magic. – Stephen King",
  "The only thing you absolutely have to know is the location of the library. – Albert Einstein"
];

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API_PATHS.GET_BOOKS);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Rotate quotes every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      {/* Banner */}
      <div className="banner">
        <h1>📚 Welcome to Digital Bevy Bookstore 📖</h1>
        <p className="banner-quote">{quotes[quoteIndex]}</p>
      </div>

      {/* Search bar */}
      <SearchBar setBooks={setBooks} />

      {/* Books / Loader */}
      <div className="book-grid">
        {loading ? (
          <div className="skeleton-loader">
            {[...Array(8)].map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-img"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <div className="empty-state">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
              alt="search books"
            />
            <h2>Search Your Favourite Books 📚</h2>
            <p>Every great journey starts with a single page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
