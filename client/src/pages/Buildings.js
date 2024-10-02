import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import CreateBuilding from "../components/CreateBuilding";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [buildings, setBuildings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateBuildingId, setUpdateBuildingId] = useState(null);
  const [updateBuildingName, setUpdateBuildingName] = useState("");
  const [updateBuildingDescription, setUpdateBuildingDescription] = useState("");

  // Fetch buildings from the server when component mounts
  useEffect(() => {
    fetch('http://localhost:5002/buildings')
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error('Error fetching buildings:', error));
  }, []);

  const handleCreateBuilding = async (newBuilding) => {
    try {
      const response = await fetch('http://localhost:5002/buildings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBuilding),
      });

      const createdBuilding = await response.json();

      if (response.ok) {
        setBuildings([...buildings, createdBuilding]);
      } else {
        console.error('Failed to create building:', createdBuilding.error);
      }
    } catch (error) {
      console.error('Error creating building:', error);
    }
  };

  const handleDelete = (buildingId) => {
    fetch(`http://localhost:5002/buildings/${buildingId}`, {
      method: 'DELETE',
    })
    .then(() => {
      setBuildings(buildings.filter(building => building._id !== buildingId));
    })
    .catch(error => console.error('Error deleting building:', error));
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleUpdate = () => {
    // Implement the update logic
    setShowUpdateModal(false);
  };

  return (
    <div style={{ background: "#40E0D0", padding: "20px", minHeight: "100vh" }}>
      <h2 className="mb-4">Home Page</h2>

      {user && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
        </div>
      )}

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
        <h3 className="mb-3">Buildings</h3>

        <Row>
          {buildings.map((building) => (
            <Col key={building._id} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{building.name}</Card.Title>
                  <Card.Text>{building.description}</Card.Text>
                  <Link to={{ pathname: `/buildings/${building._id}` }}>
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
                      setUpdateBuildingId(building._id);
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
                    onClick={() => handleDelete(building._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
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
