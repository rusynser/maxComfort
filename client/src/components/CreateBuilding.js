import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateBuilding({ show, handleClose, handleCreate }) {
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingDescription, setNewBuildingDescription] = useState('');

  const handleCreateClick = () => {
    handleCreate(newBuildingName, newBuildingDescription);
    setNewBuildingName('');
    setNewBuildingDescription('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '2rem' }}>Create Building</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newBuildingName">
            <Form.Label style={{ fontSize: '1.5rem' }}>Building Name</Form.Label>
            <Form.Control
              type="text"
              value={newBuildingName}
              onChange={(e) => setNewBuildingName(e.target.value)}
              style={{ fontSize: '1.2rem', height: '50px' }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newBuildingDescription">
            <Form.Label style={{ fontSize: '1.5rem' }}>Building Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={newBuildingDescription}
              onChange={(e) => setNewBuildingDescription(e.target.value)}
              maxLength={50}
              style={{ fontSize: '1.2rem', height: '100px' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateClick} style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateBuilding;