import React, { useState } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import CreateBuilding from "../components/CreateBuilding";
import { Link } from "react-router-dom";
import Buildings from "../building_data.json";

const Home = () => {
  const [buildings, setBuildings] = useState(Buildings);
  const [filter] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateBuildingId, setUpdateBuildingId] = useState(null);
  const [updateBuildingName, setUpdateBuildingName] = useState("");
  const [updateBuildingDescription, setUpdateBuildingDescription] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleDelete = (buildingId) => {
    setBuildings((prevBuildings) =>
      prevBuildings.filter((building) => building.id !== buildingId)
    );
  };

  const handleUpdate = () => {
    setBuildings((prevBuildings) =>
      prevBuildings.map((building) =>
        building.id === updateBuildingId
          ? {
              ...building,
              name: updateBuildingName,
              description: updateBuildingDescription,
            }
          : building
      )
    );

    setShowUpdateModal(false);
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
      <h2 className="mb-4">Home Page</h2>

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
        <h3 className="mb-3">Example Buildings</h3>
        
        <Row>
          {filteredBuildings().map((building, index, array) => (
            <Col key={building.id} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{building.name}</Card.Title>
                  <Card.Text>{building.description}</Card.Text>
                  <Button
                    variant={building.solved ? "success" : "danger"}
                    className="ml-2"
                    style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px", marginRight: "6px" }}
                    onClick={() => toggleSolvedStatus(building.id)}
                  >
                    {building.solved ? "Normal tempature" : "Low tempature"}
                  </Button>
                  <Link to={{ pathname: `/building/room/${building.id}` }}>
                    <Button
                      variant="info"
                      className="ml-2"
                      style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px", marginRight: "7px" }}
                    >
                      Detail
                    </Button>
                  </Link>
                  <Button
                    variant="warning"
                    className="ml-2"
                    style={{
                      fontSize: "1.1rem",
                      padding: "5px 12px",
                      marginBottom: "10px",
                      marginRight: "5px",
                    }}
                    onClick={() => {
                      setShowUpdateModal(true);
                      setUpdateBuildingId(building.id);
                      setUpdateBuildingName(building.name);
                      setUpdateBuildingDescription(building.description);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    style={{ fontSize: "1.1rem", padding: "5px 12px", marginBottom: "10px" }}
                    onClick={() => handleDelete(building.id)}
                  >
                    Delete
                  </Button>
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

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Update Building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="updateBuildingName">
              <Form.Label>Building Name</Form.Label>
              <Form.Control
                type="text"
                value={updateBuildingName}
                onChange={(e) => setUpdateBuildingName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateBuildingDescription">
              <Form.Label>Building Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateBuildingDescription}
                onChange={(e) => setUpdateBuildingDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUpdateModal(false)}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            style={{ fontSize: "1.1rem", padding: "10px 20px" }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;