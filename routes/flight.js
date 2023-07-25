const express = require("express");
const router = express.Router();

const flightsController = require("../controllers/flights");

router.get("/flights", flightsController.getFlights);

router.get("/flights/flights-list", flightsController.getFlightsList);

router.post("/flights", flightsController.createFlight);

module.exports = router;
