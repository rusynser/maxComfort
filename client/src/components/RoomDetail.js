import React, {useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,   ReferenceLine } from 'recharts';

const RoomDetail = ({ room, show, handleClose, onNewData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      // Генерация новых данных каждые 10 минут
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * (30 - 20 + 1) + 20) // Генерация случайного значения
      };

      setData(prevData => [...prevData, newDataPoint]);

      // Ограничение данных до последних, например, 30 точек
      if (data.length > 30) {
        setData(prevData => prevData.slice(1));
      }
      if (typeof onNewData === 'function') {
      onNewData(newDataPoint.value);
      }
    }, 1000); // время появления новой точки в графике

    return () => clearInterval(interval);
  }, [data,onNewData]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {room.name}</p>
        <p><strong>Description:</strong> {room.description}</p>
        <p><strong>Notification frequency:</strong> {room.frequency} </p>
        <p><strong>Temperature range:</strong> 20°-30° </p>
        <p><strong>Current temperature:</strong> {room.current} </p>
        <LineChart width={450} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <ReferenceLine y={30} label="Max" stroke="red" strokeDasharray="3 3" />
      <ReferenceLine y={20} label="Max" stroke="red" strokeDasharray="3 3" />
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