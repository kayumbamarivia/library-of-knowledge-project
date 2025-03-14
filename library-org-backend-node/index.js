// Require necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const swaggerUI = require("swagger-ui-express");
//Routes
const loginRoute = require("./src/routes/open/login");
const registerRoute = require("./src/routes/open/signup");
const booksRoute = require("./src/routes/protected/books");
const usersRoute = require("./src/routes/protected/users");
// Call config
require("dotenv").config();
// Create an instance of express app
const app = express();
//DB connectivity
const connect = require("./src/models/DB");
connect();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

//Create home Interface
app.get("/", (req, res) => {
  try {
    res.status(200).render("welcome");
  } catch (error) {
    res.status(500).render("failure");
  }
});

//Set view engine and other routes
app.set("view engine", "ejs");
app.use("/v1/api/login", loginRoute);
app.use("/v1/api/register", registerRoute);
app.use("/v1/api/users", usersRoute);
app.use("/v1/api/books", booksRoute);
app.use("/v1/api-docs", swaggerUI.serve, swaggerUI.setup(require("./swagger")));

app.listen(process.env.PORT, () =>
  console.log(`server is running on http://localhost:${process.env.PORT}`)
);