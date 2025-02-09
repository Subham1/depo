const mongoose = require("mongoose");

// Directly use the existing collection "restaurants"
const Restaurant = mongoose.model("restaurant", new mongoose.Schema({}, { strict: false }),'restaurants');

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const id=parseInt(req.params.id)
      const restaurant = await Restaurant.findOne({ "Restaurant ID": id }); 
      console.log(restaurant); // Use await and correct query syntax
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });  // Correct method spelling
      }
      res.json(restaurant);  // Send the found restaurant data
    } catch (err) {  // Add error handling for any potential issues
      res.status(500).json({ message: err.message });
    }
  };
  

// Get all restaurants (with pagination)
exports.getAllRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Get page number from query, default to 1
    const limit = 12;  // Set limit per page
    const skip = (page - 1) * limit;

    const totalRestaurants = await Restaurant.countDocuments();
    const restaurants = await Restaurant.find().skip(skip).limit(limit);

    res.json({
      restaurants,
      totalPages: Math.ceil(totalRestaurants / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search by Name
exports.searchByName = async (req, res) => {
    try {
      const { name } = req.query;
      // Search by 'Restaurant Name' instead of 'name'
      console.log(name);
      const restaurants = await Restaurant.find({ "Restaurant Name": new RegExp(name, "i") });
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

// Search by Location (Latitude & Longitude)

exports.searchByLocation = async (req, res) => {
  try {
    const { lat, lng } = req.query; // Include radius in query params

    // Validate coordinates
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and Longitude are required!" });
    }

    const targetLat = parseFloat(lat);
    const targetLng = parseFloat(lng);
    const maxDistance =  3000; // Dynamic radius

    // Validate coordinate ranges
    if (isNaN(targetLat) || isNaN(targetLng) || targetLat < -90 || targetLat > 90 || targetLng < -180 || targetLng > 180) {
      return res.status(400).json({ error: "Invalid coordinates!" });
    }

    // Geospatial query
    const restaurants = await Restaurant.find({
      location: {
        $near: { // Use $near instead of $nearSphere
          $geometry: {
            type: "Point",
            coordinates: [targetLng, targetLat]
          },
          $maxDistance: maxDistance
        }
      }
    });
      console.log(restaurants.length," ttoal",restaurants)
    res.json(restaurants);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" }); // Standardized error key
  }
};
