import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Author from "./pages/Author.jsx"; 
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
          <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/author">Author</Link>
        </nav>
        <h1 className="title">BookStore</h1>

    

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/author" element={<Author />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
