const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // This is the middleware that will handle all requests to /api/places

app.use("/api/users", usersRoutes); // This is the middleware that will handle all requests to /api/users

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
