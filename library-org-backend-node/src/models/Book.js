const mongoose = require("mongoose");
const Joi = require("joi");

// Define schedule schema
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    coverImage: {type: String, required: false, default: "https://covers.openlibrary.org/b/id/240727-S.jpg", trim: true}
  },
  { timestamps: true }
);

const validate = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    coverImage: Joi.string().optional(),
  })
   return schema.validate(data);
}

const Book = mongoose.model("book", bookSchema);

module.exports = {Book, validate};
