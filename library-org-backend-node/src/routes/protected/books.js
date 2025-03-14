const express = require("express");
const router = express.Router();
const authorizations = require("../../middleware/tokenVerification");
const { Book, validate } = require("../../models/Book");

// Get all books
router.get("/", authorizations, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Search books
router.get("/search", async (req, res) => {
  try {
    const { search , page = 1, limit = 10 } = req.query;
    if (!search) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    };
    const books = await Book.find(query)
                                  .skip((page - 1) * limit)
                                  .limit(limit);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error searching books", error });
  }
});

// Get a single book by ID
router.get("/:id", authorizations, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

// Create a new book
router.post("/", authorizations, async (req, res) => {
  try {
    const { title, author, description, coverImage} = req.body;

    const { error } = validate(req.body);
    if (error) {  
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!title || !author || !description) {
      return res.status(400).json({ message: "Title, author, and description are required" });
    }

    const book = new Book({
      title,
      author,
      description,
      coverImage
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
});

// Update a book
router.put("/:id", authorizations, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete a book
router.delete("/:id", authorizations, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router;
