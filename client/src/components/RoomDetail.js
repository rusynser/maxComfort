import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import axios from 'axios';
import EditRoomForm from './EditRoomForm';

const RoomDetail = ({ room, show, handleClose, onNewData, onDeleteRoom,onEditRoom }) => {
  const [data, setData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(room.current);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Функция для получения текущей температуры с бекенда
    const fetchCurrentTemperature = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/temperature/current');
        setCurrentTemp(response.data.value);
      } catch (error) {
        console.error('Error fetching current temperature:', error);
      }
    };

    // Получаем текущую температуру при монтировании компонента
    fetchCurrentTemperature();

    const interval = setInterval(() => {
      // Генерация новых данных каждые 10 минут
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * (30 - 20 + 1) + 20) // Генерация случайного значения
      };

      setData(prevData => [...prevData, newDataPoint]);

      // Ограничение данных до последних, например, 30 точек
      if (data.length > 15) {
        setData(prevData => prevData.slice(1));
      }
      if (typeof onNewData === 'function') {
        onNewData(newDataPoint.value);
      }
    }, 5000); // время появления новой точки в графике

    return () => clearInterval(interval);
  }, [data, onNewData]);
  const handleDeleteRoom = () => {
    // Логика удаления комнаты
   
    // Здесь добавьте код для сохранения обновленных данных, если нужно
    if (typeof onDeleteRoom === 'function') {
      onDeleteRoom(room.id); // Вызываем функцию удаления, переданную как пропс
    }
    handleClose(); // Закрыть модальное окно
  };
  const handleEditRoom = (editedRoom) => {
    if (typeof onEditRoom === 'function') {
      onEditRoom(editedRoom);
    }
    setShowEditModal(false);
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {room.name}</p>
        <p><strong>Description:</strong> {room.description}</p>
        <p><strong>Notification frequency:</strong> {room.frequency}</p>
        <p><strong>Temperature range:</strong> 20°-30°</p>
        <p><strong>Current temperature:</strong> {currentTemp}°C</p>
        <LineChart width={450} height={300} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <ReferenceLine y={30} label="Max" stroke="red" strokeDasharray="3 3" />
          <ReferenceLine y={20} label="Min" stroke="red" strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
        </LineChart>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="warning" onClick={() => setShowEditModal(true)}>
          Edit Room
        </Button>
      <Button variant="danger" onClick={handleDeleteRoom}>
          Delete Room
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      <EditRoomForm
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEditRoom={handleEditRoom}
        room={room}
      />
    </Modal>
  );
};

export default RoomDetail;
