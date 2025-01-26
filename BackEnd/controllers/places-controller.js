const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

let DUMMY_PlACES = [
  {
    id: "p1",
    title: "Dagdusheth Temple",
    description:
      "Hindu temple popular with pilgrims, with marble interiors & a golden Ganesh idol.",
    location: {
      lat: 18.5164297,
      lng: 73.853558,
    },
    address:
      "Ganpati Bhavan, 250, Chhatrapati Shivaji Maharaj Rd, Mehunpura, Budhwar Peth, Pune, Maharashtra 411002",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Gateway of India",
    description:
      "The Gateway of India is a 26-meter (85-foot) arch monument in Mumbai, India that's a top tourist attraction and symbol of the city's history and independence",
    address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
    coordinates: {
      lat: 18.9219841,
      lng: 72.8320794,
    },
    creator: "u2",
  },
];

const getPlaceByID = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided places id.",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // { place } => { place: place }
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHQujztb-O86piW_-DaD8n4HUMyI2ZH5tcLSFZoqWzM5REv6Z_DJteZNG5Oibcrfbutg&usqp=CAU",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace }); // 201 is the status code for "resource created"
};

const updatePlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// const deletePlace = (req, res, next) => {
//   const placeId = req.params.pid;
//   if (DUMMY_PlACES.find((p) => p.id === placeId)) {
//     throw new HttpError("Could not find a place for that id.", 404);
//   }
//   DUMMY_PlACES = DUMMY_PlACES.filter((p) => p.id !== placeId);
//   res.status(200).json({ message: "Deleted place." });
// };

exports.getPlaceByID = getPlaceByID;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
// exports.deletePlace = deletePlace;
