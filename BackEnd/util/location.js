const axios = require("axios");
const HttpError = require("../models/http-error");

//"AIzaSyCpSrG89YD4-rU01zT7ScDt1YvRZYMmsts"
//process.env.GOOGLE_API_KEY
const API_KEY = "AIzaSyCpSrG89YD4-rU01zT7ScDt1YvRZYMmsts";

async function getCoordsForAddress(address) {
  //   return { lat: 18.5164297, lng: 73.853558 };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
