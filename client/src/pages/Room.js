import React, { useState, useEffect } from "react";
import { Button, ListGroup} from "react-bootstrap";
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
    <div style={{ padding: '20px', maxWidth: '1450px', margin: 'auto' }}>
      <h2>Room Page</h2>
      {buildingId && <h5>buildingId {buildingId}</h5>}
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
          <Button
            variant="primary"
            style={{ fontSize: "1.1rem", padding: "6px 20px", marginRight: "10px", marginLeft: "1300px", }}
            onClick={() => setShowCreateModal(true)}
          >
            Create Room
          </Button>
          <ListGroup style={{marginTop:"30px"}}>
            {filteredRooms.map((room) => (
              <ListGroup.Item key={room.id}>
                <p>Name:{room.name}{" "}</p>
                <p>Description:{room.description}{" "}</p>
                {latestValue && <p>Current tempature: {latestValue}°</p>}
                <RoomDetail onNewData={handleNewData} room={room} />
                <Button variant="info" style={{ fontSize: "1.1rem", padding: "5px 12px" }} onClick={() => handleRoomDetail(room)}>
                  Details
                </Button>{" "}
                <Button variant="danger" style={{ fontSize: "1.1rem", padding: "5px 12px" }} onClick={() => handleDeleteRoom(room.id)}>
                  Delete
                </Button>{" "}
                <Button variant="warning" style={{ fontSize: "1.1rem", padding: "5px 12px" }}onClick={() => setShowEditModal(true)}>
                  Edit
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

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
            />
          )}
        </>
      )}
    </div>
  );
};

export default RoomPage;