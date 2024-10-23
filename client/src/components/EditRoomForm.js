import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditRoomForm = ({ show, handleClose, handleEditRoom }) => {
  const [editRoomName, setEditRoomName] = useState("");
  const [editRoomDescription, setEditRoomDescription] = useState("");
  const [editRoomFrequency, setEditRoomFrequency] = useState('5');
  const [editRoomRange] = useState("");
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(30);
  const handleEditClick = () => {
    handleEditRoom({
      name: editRoomName,
      description: editRoomDescription,
      frequency: editRoomFrequency,
      range: editRoomRange,
      minTemp: minValue,
      maxTemp: maxValue
    });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editRoomName">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              value={editRoomName}
              onChange={(e) => setEditRoomName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editRoomDescription">
            <Form.Label>Room Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              maxLength={50}
              value={editRoomDescription}
              onChange={(e) => setEditRoomDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editRoomFrequency">
            <Form.Label>Notification frequency </Form.Label>
            <Form.Control
            as="select"
            value={editRoomFrequency}
            onChange={(e) => setEditRoomFrequency(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="editRoomRange">
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
        <Button variant="primary" onClick={handleEditClick}>
          Edit Room
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRoomForm;