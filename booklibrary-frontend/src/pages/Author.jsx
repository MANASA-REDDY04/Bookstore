import React from "react";
import "./Author.css";

function Author() {
  return (
    <div className="author-container">
      <h1 className="author-title">Author</h1>
      <p className="author-name">Manasa Reddy Kandadi</p>
      <p className="author-description">
        I am a IT Graduate with freelancing experience and strong skills in the MERN stack
        (MongoDB, Express.js, React, Node.js) and i also do problem-solving through DSA, check who is manasa by clicking on my socials.
      </p>
      <div className="author-links">
        <a
          href="https://github.com/MANASA-REDDY04"
          target="_blank"
          rel="noopener noreferrer"
          className="author-link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/kandadi-manasa"
          target="_blank"
          rel="noopener noreferrer"
          className="author-link"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default Author;
