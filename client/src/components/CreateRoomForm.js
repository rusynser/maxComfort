import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const CreateRoomForm = ({ show, handleClose, handleCreateRoom }) => {
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomFrequency, setNewRoomFrequency] = useState('5');
  const [newRoomRange] = useState("");
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(30);
  const handleCreateClick = () => {
    handleCreateRoom({
      name: newRoomName,
      description: newRoomDescription,
      frequency: newRoomFrequency,
      range: newRoomRange,
      minTemp: minValue,
      maxTemp: maxValue
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newRoomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newRoomDescription">
            <Form.Label>Room Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={newRoomDescription}
              onChange={(e) => setNewRoomDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newRoomFrequency">
            <Form.Label>Notification frequency </Form.Label>
            <Form.Control
            as="select"
            value={newRoomFrequency}
            onChange={(e) => setNewRoomFrequency(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newRoomRange">
            <Form.Label> <p>Temperature range : {minValue}° - {maxValue}°</p></Form.Label>
            <p>Min. temperature</p>
            <input class="form-control" type="number" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
            <label for="formGroupExampleInput">Max. temperature</label>
            <input class="form-control" type="number" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick}>
          Create Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRoomForm;