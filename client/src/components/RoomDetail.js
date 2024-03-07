import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,   ReferenceLine } from 'recharts';

const RoomDetail = ({ room, show, handleClose }) => {

  const data = [
    { name: 'Янв', uv: 25},
    { name: 'Фев', uv: 21},
    { name: 'Мар', uv: 24},
    { name: 'Апр', uv: 27},
    { name: 'Май', uv: 25},
    { name: 'Июн', uv: 22},
    { name: 'Июл', uv: 25},
  ];

  const formatYAxis = (value) => {
    return `${value}°`; // Форматирование значения с добавлением "°"
  };  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {room.name}</p>
        <p><strong>Description:</strong> {room.description}</p>
        <p><strong>Notification frequency:</strong> {room.frequency} </p>
        <p><strong>Temperature range:</strong> {room.minTemp}°-{room.maxTemp}° </p>
        <p><strong>Current temperature:</strong> {room.current} </p>
 <LineChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis tickFormatter={formatYAxis} domain={[   0, 40]}  /> {/* Используйте tickFormatter для форматирования значений */}
      <ReferenceLine y={30}  stroke="red" />
      <ReferenceLine y={20}  stroke="red" />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomDetail;