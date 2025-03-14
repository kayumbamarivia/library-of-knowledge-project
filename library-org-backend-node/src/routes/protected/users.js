const express = require("express");
const router = express.Router();
const authorizations = require("../../middleware/tokenVerification");
const { User } = require("../../models/User");

router.get("/", authorizations, async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/:id", authorizations, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.put("/:id", authorizations, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while updating a User" });
  }
});

router.delete("/:id", authorizations, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json({ message: "user deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting a User" });
  }
});

module.exports = router;
