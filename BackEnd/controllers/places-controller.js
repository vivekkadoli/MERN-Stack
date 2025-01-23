const HttpError = require("../models/http-error");

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

exports.getPlaceByID = getPlaceByID;
exports.getPlaceByUserId = getPlaceByUserId;
