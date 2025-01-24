const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const { v4: uuid } = require("uuid");
const getCoordsForAddress = require("../util/location");

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

const getPlaceByID = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PlACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided places id.",
      404
    );
  }

  res.json({ place }); // { place } => { place: place }
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PlACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  res.json({ places });
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

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PlACES.push(createdPlace); // DUMMY_PlACES is a constant array, so we can push to it

  res.status(201).json({ place: createdPlace }); // 201 is the status code for "resource created"
};

const updatePlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PlACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PlACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PlACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (DUMMY_PlACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_PlACES = DUMMY_PlACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceByID = getPlaceByID;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
