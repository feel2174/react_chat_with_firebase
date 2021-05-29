import React, { Component } from 'react';
import styled from 'styled-components';

import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from '../../../firebase';
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action';
import { connect } from 'react-redux';

class ChatRoom extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: firebase.database().ref('chatRooms'),
    chatRooms: [],
  };
  componentDidMount() {
    this.AddChatRoomsListener();
  }
  AddChatRoomsListener = () => {
    const chatRoomsArray: [] = [];
    this.state.chatRoomsRef.on('child_added', (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      this.setState({ chatRooms: chatRoomsArray });
    });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, description } = this.state;
    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  };
  addChatRoom = async () => {
    const { name, description } = this.state;
    const { user } = this.props;
    const key = this.state.chatRoomsRef.push().key;
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
      await this.state.chatRoomsRef.child(key).update(newChatRoom);
      this.setState({ name: '', description: '', show: false });
    } catch (error) {
      alert(error);
    }
  };

  changeChatRoom = (room) => {
    this.props.dispatch(setCurrentChatRoom(room));
  };

  isFormValid = (name: string, description: string) => name && description;
  render() {
    return (
      <>
        <ChatRoomContainer>
          <FaRegSmileWink style={{ marginRight: 3 }} />
          Chat Rooms ({this.state.chatRooms.length})
          <FaPlus
            onClick={this.handleShow}
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
          />
        </ChatRoomContainer>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.state.chatRooms.length > 0 &&
            this.state.chatRooms.map((room: any) => (
              <li key={room.id} onClick={() => this.changeChatRoom(room)}>
                # {room.name}
              </li>
            ))}
        </ul>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create ChatRoom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room name"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Room Explanation</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  type="text"
                  placeholder="Enter a chat room description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(ChatRoom);

const ChatRoomContainer = styled.div`
  margin-top: 10px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;
