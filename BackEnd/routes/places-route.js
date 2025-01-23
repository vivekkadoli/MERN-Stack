const express = require("express");

const placesController = require("../controllers/places-controller");

const router = express.Router();

router.get("/:pid", placesController.getPlaceByID);

router.get("/user/:uid", placesController.getPlaceByUserId);

router.post("/", placesController.createPlace);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
