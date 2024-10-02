import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateBuilding = ({ show, handleClose, handleCreate }) => {
  const [buildingName, setBuildingName] = useState("");
  const [buildingDescription, setBuildingDescription] = useState("");
  const [temperatureLimit, setTemperatureLimit] = useState(0); // Добавляем новое состояние для лимита температуры

  const handleSubmit = () => {
    const newBuilding = {
      name: buildingName,
      description: buildingDescription,
      temperatureLimit: temperatureLimit // Передаем лимит температуры в объекте нового здания
    };
    console.log("New Building:", newBuilding); // <-- Add this line
    handleCreate(newBuilding); // Передаем новый объект здания в handleCreate
    handleClose(); // Закрываем модальное окно после создания здания
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Building</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBuildingName">
            <Form.Label>Building Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter building name"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBuildingDescription">
            <Form.Label>Building Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter building description"
              value={buildingDescription}
              onChange={(e) => setBuildingDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTemperatureLimit">
            <Form.Label>Temperature Limit (°C)</Form.Label>
            <Form.Control
              type="number"
              value={temperatureLimit}
              onChange={(e) => setTemperatureLimit(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBuilding;
