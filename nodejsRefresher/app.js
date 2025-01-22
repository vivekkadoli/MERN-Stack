const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", (req, res, next) => {
  res.send("<h1>" + req.body.username + "</h1>");
});

app.get("/", (req, res, next) => {
  res.send(
    "<form action='/user' method='POST'><input type='text' name='username'><button type='submit'>Create User</button></input></form>"
  );
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
