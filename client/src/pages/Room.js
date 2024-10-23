import React, { useState, useEffect } from "react";
import {Row, Card, Col} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Buildings from '../building_data.json';
import Rooms from '../room_data.json';
import CreateRoomForm from '../components/CreateRoomForm';
import RoomDetail from '../components/RoomDetail';
import EditRoomForm from "../components/EditRoomForm";

const RoomPage = () => {
  const { buildingId } = useParams();
  const selectedBuilding = Buildings.find((building) => building.id === buildingId && building !== null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRoomDetail, setShowRoomDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedState] = useState('all');
  const [selectedPriority] = useState('all');
  const [loading, setLoading] = useState(true); // Loading state
  const [latestValue, setLatestValue] = useState(null);

  useEffect(() => {
    // Simulate fetching rooms data
    setTimeout(() => {
      if (buildingId) {
        // Fetch rooms for a specific building
        setRooms(Rooms.filter((room) => room.buildingId === Number(buildingId)));
      } else {
        // Fetch all rooms
        setRooms(Rooms);
      }
      setLoading(false);
    }, 1000); 
  }, [buildingId]);

  const handleNewData = (newValue) => {
    setLatestValue(newValue);
  };

  const handleCreateRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
    setShowCreateModal(false);
  };

  const handleRoomDetail = (room) => {
    setSelectedRoom(room);
    setShowRoomDetail(true);
  };

  const handleCloseRoomDetail = () => {
    setShowRoomDetail(false);
    setSelectedRoom(null);
  };

  const handleDeleteRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
    // Close the detail modal if the deleted room was open
    setSelectedRoom(null);
    setShowRoomDetail(false);
  };

  const handleEditRoom = (editRoom) => {
    const updatedRooms = rooms.map((room) =>
      room.id === editRoom.id ? { ...room, ...editRoom } : room
    );
    setRooms(updatedRooms);
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  const handleUpdateRoom = (updatedRoom) => {
    const updatedRooms = rooms.map((room) =>
      room.id === updatedRoom.id ? { ...room, ...updatedRoom } : room
    );
    setRooms(updatedRooms);
    setShowCreateModal(false);
    setSelectedRoom(null);
  };

  const filteredRooms = rooms.filter((room) => {
    const stateFilter = selectedState === 'all' || room.state === selectedState;
    const priorityFilter =
      selectedPriority === 'all' || room.priority === selectedPriority;
    return stateFilter && priorityFilter;
  });

 

  return (
    <div style={{ background: "#66f2e4",padding: "20px", minHeight: "100vh" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {selectedBuilding && buildingId && (
            <>
              <h3>Building Details</h3>
              <p>Name: {selectedBuilding.name}</p>
              <p>Description: {selectedBuilding.description}</p>
            </>
          )}
          <button
          type="button"
            class="btn btn-light"
            style={{ fontSize: "1.1rem", padding: "20px 20px", marginLeft:"0px", marginBottom:"20px"  }}
            onClick={() => setShowCreateModal(true)}
          >
            Create Room
          </button>
          <div style={{ background: "white", padding: "40px", borderRadius: "3px" }}>
          <h2>Room Page</h2>
          {buildingId && <h5>buildingId {buildingId}</h5>}
          <Row className="g-4"  >
            {filteredRooms.map((room) => (
               <Col key={room.id} lg={4} className="mb-7">
                 <Card>
                 <Card.Body>
                 <div  style={{ cursor: 'pointer' }} onClick={() => handleRoomDetail(room)}>
                 <Card.Title>  <span style={{ fontWeight: 'bold' }}>Name:</span>{room.name}{" "}</Card.Title>
                 <Card.Text> <span style={{ fontWeight: 'bold' }}>Description:</span>{room.description}{" "}</Card.Text>
                {latestValue &&  <Card.Text style={{ marginTop: '-10px' }}><span style={{ fontWeight: 'bold' }}>Current tempature:</span> {latestValue}°</Card.Text>}
                <RoomDetail onNewData={handleNewData} room={room} />
                </div>
                </Card.Body>
                <Card.Footer className="text-muted">{/* Any additional info */}</Card.Footer>
                </Card>
              </Col>
            ))}
            </Row>
            </div>

          <CreateRoomForm
            show={showCreateModal}
            handleClose={() => {
              setShowCreateModal(false);
              setSelectedRoom(null);
            }}
            handleCreateRoom={handleCreateRoom}
            handleUpdateRoom={handleUpdateRoom}
            room={selectedRoom}
          />

<EditRoomForm
         show={showEditModal}
         handleClose={() => {
           setShowEditModal(false);
           setSelectedRoom(null);
         }}
         handleEditRoom={handleEditRoom}
         handleUpdateRoom={handleUpdateRoom}
         Room={selectedRoom}
          />

          {selectedRoom && (
            <RoomDetail
              room={selectedRoom}
              show={showRoomDetail}
              handleClose={handleCloseRoomDetail}
              onDeleteRoom={handleDeleteRoom} // Передача функции удаления
              onEditRoom={handleEditRoom}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RoomPage;