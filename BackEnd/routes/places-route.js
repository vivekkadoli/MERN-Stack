const express = require("express");

const router = express.Router();

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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PlACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place }); // { place } => { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PlACES.find((p) => {
    return p.creator === userId;
  });
  res.json({ place });
});

module.exports = router;
