import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const EditBuildingDetail = ({ building, show, handleClose, handleEditBuilding }) => {
  const [editBuildingName, setEditBuildingName] = useState("");
  const [editBuildingDescription, setEditBuildingDescription] = useState("");

  // Инициализация формы значениями из выбранного здания при открытии модального окна
  useEffect(() => {
    if (building) {
      setEditBuildingName(building.name);
      setEditBuildingDescription(building.description);
    }
  }, [building]);

  // Обработчик кнопки "Edit building"
  const handleSave = () => {
    handleEditBuilding({
      ...building,
      name: editBuildingName,
      description: editBuildingDescription,
    });
    handleClose(); // Закрываем модальное окно после сохранения
  };

  if (!building) {
    return null; // Или можно показать сообщение об ошибке, например, "Building not found"
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Building</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editBuildingName">
            <Form.Label>Building Name</Form.Label>
            <Form.Control
              type="text"
              value={editBuildingName}
              onChange={(e) => setEditBuildingName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editBuildingDescription">
            <Form.Label>Building Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              maxLength={50}
              value={editBuildingDescription}
              onChange={(e) => setEditBuildingDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBuildingDetail;
