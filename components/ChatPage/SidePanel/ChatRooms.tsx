import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';

const ChatRoom = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const user = useSelector((state) => state.user.currentUser);
  const chatRoomsRef = firebase.database().ref('chatRooms');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid(name, description)) {
      addChatRoom();
    }
  };

  const addChatRoom = async () => {
    const key = chatRoomsRef.push().key;
    const newChatRoom = {
      id: key,
      name: name,
      description: description,
      createdBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };

    try {
      await chatRoomsRef.child(key).update(newChatRoom);
      setName('');
      setDescription('');
      setShow(false);
    } catch (error) {
      alert(error);
    }
  };

  const isFormValid = (name: string, description: string) => {
    return name && description;
  };

  return (
    <>
      <ChatRoomContainer>
        <FaRegSmileWink style={{ marginRight: 3 }} />
        Chat Rooms
        <FaPlus
          onClick={handleShow}
          style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
        />
      </ChatRoomContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create ChatRoom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter a chat room name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Room Explanation</Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter a chat room description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatRoom;

const ChatRoomContainer = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;
