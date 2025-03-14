const route = require("express").Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../../models/User")
const bcrypt = require("bcrypt");
const _ = require("lodash");

route.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({
        message: _.get(error, "details[0].message", "Validation error"),
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.status(200).send({ data: [token, user], message: "logged in successfully"});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = route;
