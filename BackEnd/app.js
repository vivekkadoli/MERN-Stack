const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-route");

const app = express();

app.use("/api/places", placesRoutes); // This is the middleware that will handle all requests to /api/places

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
