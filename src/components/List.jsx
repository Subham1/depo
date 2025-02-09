import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import './List.css';

const List = () => {
  const [restaurants, setRestaurants] = useState([]);  // Stores backend data (full or search results)
  const [searchName, setSearchName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 12;

  // Fetch all restaurants on initial load
  useEffect(() => {
    axios.get("http://localhost:5000/api/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle search by name
  const handleSearchByName = () => {
    axios.get(`http://localhost:5000/api/restaurants/search/name?name=${searchName}`)
      .then(res => {
        setRestaurants(res.data);  // Replace restaurants with search results
        setCurrentPage(1);  // Reset pagination to first page
      })
      .catch(err => console.error(err));
  };

  // Handle search by location
  const handleSearchByLocation = () => {
    axios.get(`http://localhost:5000/api/restaurants/search/location?lat=${latitude}&lng=${longitude}`)
      .then(res => {
        setRestaurants(res.data);
        setCurrentPage(1);
      })
      .catch(err => console.error(err));
  };

  // Determine restaurants for the current page
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(restaurants.length / restaurantsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center" style={{ fontStyle: "italic" }}>
        Find your desired Restaurant
      </h2>

      {/* Search by Name */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
        <input 
          type="text" 
          className="form-control w-25" 
          placeholder="Search by Name"
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)} 
        />
        <button className="btn btn-danger" onClick={handleSearchByName}>Search</button>
      </div>

      {/* Search by Location */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        <input 
          type="number" 
          className="form-control w-25" 
          placeholder="Latitude"
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
        />
        <input 
          type="number" 
          className="form-control w-25" 
          placeholder="Longitude"
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
        />
        <button className="btn btn-danger" onClick={handleSearchByLocation}>Search</button>
      </div>

      {/* Restaurant Cards */}
      <div className="row">
        {currentRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title">{restaurant["Restaurant Name"]}</h5>
                <p className="card-text text-muted mb-1"><strong>City:</strong> {restaurant.City}</p>
                <p className="card-text text-muted mb-1"><strong>Address:</strong> {restaurant.Address}</p>
                <p className="card-text text-muted mb-2"><strong>Cuisines:</strong> {restaurant.Cuisines}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={() => navigate(`/restaurant/${restaurant["Restaurant ID"]}`)}>
                    View Details
                  </button>
                  <a 
                    href={`https://www.google.com/maps?q=${restaurant.Latitude},${restaurant.Longitude}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-danger">
                    <FaMapMarkerAlt size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {restaurants.length > restaurantsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <button 
            className="btn btn-outline-danger mx-2" 
            onClick={prevPage} 
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="align-self-center">
            Page {currentPage} of {Math.ceil(restaurants.length / restaurantsPerPage)}
          </span>
          <button 
            className="btn btn-outline-danger mx-2" 
            onClick={nextPage} 
            disabled={currentPage >= Math.ceil(restaurants.length / restaurantsPerPage)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
