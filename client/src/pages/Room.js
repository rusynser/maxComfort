import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";

const RoomPage = () => {
  const { buildingId } = useParams(); // Get buildingId from the URL
  const [building, setBuilding] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Building ID from URL:", buildingId); // Debug: Check the buildingId

    if (buildingId) {
      // Fetch the building details using buildingId
      axios.get(`http://localhost:5002/buildings/${buildingId}`)
        .then(response => {
          console.log("Building data fetched:", response.data); // Debug: Log the building data
          setBuilding(response.data); // Set the building data
        })
        .catch(error => {
          console.error("Error fetching building data:", error); // Debug: Log the error
          setError("Error fetching building data");
        });

      // Fetch the current temperature
      axios.get('http://localhost:5002/getTemp')
        .then(response => {
          console.log("Temperature fetched:", response.data.temp); // Debug: Log the temperature
          setTemperature(response.data.temp); // Set the temperature
        })
        .catch(error => {
          console.error("Error fetching temperature:", error); // Debug: Log the error
          setError("Error fetching temperature");
        })
        .finally(() => {
          setLoading(false); // Stop loading after both requests complete
        });
    }
  }, [buildingId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Room Page</h2>

      {building ? (
        <div>
          <h3>Building Name: {building.name}</h3>
          <p>Description: {building.description}</p>

          {temperature !== null ? (
            <h3>Current Temperature: {temperature}°C</h3>
          ) : (
            <p>Loading temperature...</p>
          )}
          
          {temperature > building.temperatureLimit && (
            <Alert variant="danger">
              Warning: The temperature exceeds the safe limit of {building.temperatureLimit}°C!
            </Alert>
          )}

          <Button
            onClick={() => {
              axios.get('http://localhost:5002/getTemp')
                .then(response => {
                  setTemperature(response.data.temp);
                })
                .catch(error => {
                  console.error('Error refreshing temperature:', error);
                });
            }}
          >
            Refresh Temperature
          </Button>
        </div>
      ) : (
        <p>Building not found.</p>
      )}
    </div>
  );
};

export default RoomPage;
