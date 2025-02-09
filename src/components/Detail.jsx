import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt,FaCity,FaCalendarCheck,FaBuilding, FaConciergeBell, FaDollarSign, FaUtensils, FaStar, FaClipboardList, FaVoteYea } from 'react-icons/fa';
import './Detail.css'
const Detail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${id}`)
      .then(res => setRestaurant(res.data))
      .catch(err => {
        console.error(err);
        setErrorMessage("Failed to load restaurant data");
      });
  }, [id]);

  if (errorMessage) return <h3 className="text-center mt-4">{errorMessage}</h3>;
  if (!restaurant) return <h3 className="text-center mt-4">Loading...</h3>;

  const restaurantDetails = [
    { label: "Restaurant ID", value: restaurant["Restaurant ID"], icon: <FaClipboardList /> },
    { label: "Restaurant Name", value: restaurant["Restaurant Name"], icon: <FaUtensils /> },
    { label: "Cuisine", value: restaurant.Cuisines || "Not available", icon: <FaUtensils /> },
   
    { label: "Rating", value: `${restaurant["Aggregate rating"]} - ${restaurant["Rating text"]}`, icon: <FaStar /> },
   
    { label: "City", value: restaurant.City || "City not available", icon: <FaCity /> },
   
    { label: "Location", value: `${restaurant.Latitude}, ${restaurant.Longitude}` || "Location not available", icon: <FaMapMarkerAlt /> },
    { label: "Votes", value: restaurant.Votes, icon: <FaVoteYea /> },
    { label: "Average Cost for Two", value: `${restaurant["Average Cost for two"]} ${restaurant.Currency}`, icon: <FaDollarSign /> },
    { label: "Has Table Booking", value: restaurant["Has Table booking"] ? "Yes" : "No", icon: <FaCalendarCheck /> },
    { label: "Has Online Delivery", value: restaurant["Has Online delivery"] ? "Yes" : "No", icon: <FaConciergeBell /> },
    { label: "Is Delivering Now", value: restaurant["Is delivering now"] ? "Yes" : "No", icon: <FaConciergeBell /> },
    { label: "Switch to Order Menu", value: restaurant["Switch to order menu"] ? "Yes" : "No", icon: <FaClipboardList /> },
    { label: "Address", value: restaurant.Address || "Address not available", icon: <FaBuilding /> },
  ];

  return (
    <div className="container mt-4">
  <h2>{restaurant["Restaurant Name"]}</h2>

  <div className="main-details mt-3">
    <p><strong>Address:</strong> {restaurant.Address || "Address not available"}</p>
    <p><strong>City:</strong> {restaurant.City || "City not available"}</p>
    <p><strong>Location:</strong> {restaurant.Latitude ? `${restaurant.Latitude}, ${restaurant.Longitude}` : "Location not available"}</p>
  </div>

  <div className="restaurant-details mt-4">
    {/* Side Heading for the Details */}
    <div className="details-heading d-flex align-items-center mb-3">
     
      <h4 className="m-0">Details of Restaurant</h4>
      
    </div>

    <div className="row mt-3">
      {restaurantDetails.map((detail, index) => (
        <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="icon me-3">
                  {detail.icon}
                </div>
                <div>
                  <h5 className="card-title">{detail.label}</h5>
                  <p className="card-text">{detail.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Detail;
