import React, { useState} from 'react';
import { Modal, Button } from "react-bootstrap";
import EditBuildingDetail from './EditBuildingForm';

const BuildingDetail = ({ building, show, handleClose, onEditBuilding, onDeleteBuilding}) => {
const [showEditModal, setShowEditModal] = useState(false);
    if (!building) {
        return null; // Или можно показать сообщение об ошибке, например, "Building not found"
      }
      const handleEditBuilding = (editedBuilding) => {
        if (typeof onEditBuilding === 'function') {
          onEditBuilding(editedBuilding);
        }
        setShowEditModal(false);
      };
    
      const handleDeleteBuilding = () => {
      if (typeof onDeleteBuilding=== 'function') {
        onDeleteBuilding(building.id); // Вызываем функцию удаления, переданную как пропс
      }
      handleClose(); // Закрыть модальное окно
    };



  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Building Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {building.name}</p>
        <p><strong>Description:</strong> {building.description}</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="warning" onClick={() => setShowEditModal(true)}>
          Edit Building
        </Button>
        <Button variant="danger" onClick={handleDeleteBuilding}>
          Delete Building
        </Button>
      
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      <EditBuildingDetail
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEditBuilding={handleEditBuilding}
        building={building}
      />
    </Modal>
    </>
  );
};

export default BuildingDetail;
