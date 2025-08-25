import React from "react";
import "./BookCard.css";

function BookCard({ book }) {
  // Generates default rating between 3.9 - 5 if not available
  const getRating = () => {
    if (book.rating) {
      return book.rating;
    }
    return (Math.random() * (5 - 3.9) + 3.9).toFixed(1);
  };

  return (
    <div className="book-card">
      <img
        src={book.thumbnail || "https://via.placeholder.com/120x180?text=No+Image"}
        alt={book.title}
        className="book-image"
      />
      <h3>{book.title}</h3>

      <p>{book.authors && book.authors.length > 0 ? book.authors.join(", ") : "Unknown Author"}</p>

      <p>⭐ {getRating()}</p>

      {book.previewLink && (
        <a href={book.previewLink} target="_blank" rel="noreferrer">
          Preview
        </a>
      )}
    </div>
  );
}

export default BookCard;
