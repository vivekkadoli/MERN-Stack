const HttpError = require("../models/http-error");

const { v4: uuid } = require("uuid");

const DUMMY_PlACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PlACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

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

exports.getPlaceByID = getPlaceByID;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
