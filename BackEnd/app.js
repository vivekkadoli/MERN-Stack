const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

mongoose
  .connect(
    "mongodb+srv://MERNProject:WuK4wEYFewiP7EdM@mernprojectcluster.0r089.mongodb.net/mern?retryWrites=true&w=majority&appName=MERNProjectCluster"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
