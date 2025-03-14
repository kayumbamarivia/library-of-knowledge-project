const mongoose = require("mongoose");
const Joi = require("joi");

// Define user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar : {type: String, required: false, default: "profile.png", trim: true}
});

// Validate user data with joi
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional(),
  });
  return schema.validate(data);
};

const User = mongoose.model("user", userSchema);

module.exports = { validate, User};
