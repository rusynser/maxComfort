import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import CreateBuilding from "../components/CreateBuilding";
import { Link } from "react-router-dom";
import Buildings from "../building_data.json";
import BuildingDetail from "../components/BuildingDetail";

const Home = () => {
  const [buildings, setBuildings] = useState(Buildings);
  const [filter] = useState("all");
  const [setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBuildingDetail, setShowBuildingDetail] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const toggleSolvedStatus = (buildingId) => {
    setBuildings((prevBuildings) => {
      return prevBuildings.map((building) =>
        building.id === buildingId
          ? { ...building, solved: !building.solved }
          : building
      );
    });
  };

  const filteredBuildings = () => {
    if (filter === "all") {
      return buildings;
    } else if (filter === "solved") {
      return buildings.filter((building) => building.solved);
    } else if (filter === "unsolved") {
      return buildings.filter((building) => !building.solved);
    }
    return [];
  };

  const handleDeleteBuilding = (buildingId) => {
    const updatedBuildings = buildings.filter((building) => building.id !== buildingId);
    setBuildings(updatedBuildings);
    // Close the detail modal if the deleted room was open
    setSelectedBuilding(null);
    setShowBuildingDetail(false);
  };

  const handleEditBuilding = (editBuilding) => {
    const updatedBuildings = buildings.map((building) =>
      building.id === editBuilding.id ? { ...building, ...editBuilding } : building
    );
    setBuildings(updatedBuildings);
    setShowEditModal(false);
    setSelectedBuilding(null);
  };

  const handleBuildingDetail = (buildings) => {
    setSelectedBuilding(buildings);
    setShowBuildingDetail(true);
  }

  const handleCloseBuildingDetail = () => {
    setShowBuildingDetail(false);
    setSelectedBuilding(null);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateBuilding = (newBuildingName, newBuildingDescription) => {
    const newBuilding = {
      id: buildings.length + 1,
      name: newBuildingName,
      description: newBuildingDescription,
      solved: false,
    };

    setBuildings([...buildings, newBuilding]);

    setShowCreateModal(false);
  };

  return (
    <div style={{ background: "#66f2e4", padding: "20px", minHeight: "100vh" }}>

      <div className="mb-3">
        <Button
          variant="light"
          style={{ fontSize: "1.1rem", padding: "12px 14px" }}
          onClick={handleShowCreateModal}
          className="mt-3"
        >
          Create Building
        </Button>
      </div>
      <div style={{ background: "white", padding: "40px", borderRadius: "3px" }}>
        <h3 className="mb-3">All Buildings</h3>
        
        <Row>
          {filteredBuildings().map((building, index, array) => (
            <Col key={building.id} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                <Link to={{ pathname: `/building/room/${building.id}` }}  style={{ textDecoration: 'none', color: 'inherit' , }}>
                  <Card.Title>{building.name}</Card.Title>
                  <Card.Text>{building.description}</Card.Text>
                  </Link>
                  <Button
                    variant={building.solved ? "success" : "danger"}
                    className="ml-2"
                    style={{ fontSize: "1.1rem", padding: "5px 12px", marginTop: "10px", marginRight: "6px" }}
                    onClick={() => toggleSolvedStatus(building.id)}
                  >
                    {building.solved ? "Normal tempature" : "Low tempature"}
                  </Button>
                  <button style={{border:"none", background:"none",marginTop: '10px'}}
                    onClick={() => {
                      handleBuildingDetail(building)
                    }}>
                  <img 
        src="/settings.png" 
        width="37" 
        height="37" 
        className="d-inline-block align-top" 
        alt="Home" 
      />
      </button>
                  
                </Card.Body>
                <Card.Footer className="text-muted">{/* Any additional info */}</Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <CreateBuilding
  show={showCreateModal}
  handleClose={handleCloseCreateModal}
  handleCreate={handleCreateBuilding}
/>

<BuildingDetail
              building={selectedBuilding}
              show={showBuildingDetail}
              handleClose={handleCloseBuildingDetail}
              onDeleteBuilding={handleDeleteBuilding}
              onEditBuilding={handleEditBuilding}
            />

      
    </div>
  );
};

export default Home;