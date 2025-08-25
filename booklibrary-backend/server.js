const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Mongo Error:", err));


const bookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  thumbnail: String,
  rating: Number,
  previewLink: String,
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);


app.get("/", (req, res) => {
  res.send("BookStore API is running...");
});

// Fetch from Google Books API + Save
app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${q}`
    );

    const results = response.data.items.map((item) => {
      const volume = item.volumeInfo;
      return {
        title: volume.title || "No Title",
        authors: volume.authors || ["Unknown"],
        thumbnail: volume.imageLinks?.thumbnail || "",
        rating: volume.averageRating || null,
        previewLink: volume.previewLink || ""
      };
    });

    // Save in DB
    const savedBooks = await Book.insertMany(results);
    res.json(savedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get stored books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stored books" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
