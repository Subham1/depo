const express = require("express");
const router = express.Router();
const restaurantController = require("../controll/controller");

// Route for getting restaurant by ID
router.get("/:id", restaurantController.getRestaurantById);

// Route for getting all restaurants (with pagination)
router.get("/", restaurantController.getAllRestaurants);

// Route for searching by restaurant name
router.get("/search/name", restaurantController.searchByName);

// Route for searching by location (latitude & longitude)
router.get("/search/location", restaurantController.searchByLocation);

module.exports = router;
