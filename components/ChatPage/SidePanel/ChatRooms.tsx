// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { FaRegSmileWink, FaPlus } from 'react-icons/fa';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useDispatch, useSelector } from 'react-redux';
// import firebase from '../../../firebase';
// import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action';

// const ChatRoom = () => {
//   const [show, setShow] = useState<boolean>(false);
//   const [name, setName] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [chatRooms, setChatRooms] = useState([]);
//   const [firstLoad, setFirstLoad] = useState(true);
//   const user = useSelector((state) => state.user.currentUser);
//   const chatRoomsRef = useRef(firebase.database().ref('chatRooms'));
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     addChatRoomListener();
//     return () => {
//       chatRoomsRef.current.off('child_added');
//     };
//   }, [chatRoomsRef]);

//   const changeChatRoom = (room) => {
//     dispatch(setCurrentChatRoom(room));
//   };

//   console.log('chatRooms: ', chatRooms);

//   const addChatRoomListener = () => {
//     const chatRoomsArray: any = [];
//     chatRoomsRef.current.on('child_added', (DataSnapshot) => {
//       chatRoomsArray.push(DataSnapshot.val());
//       setChatRooms(chatRoomsArray);
//       if (firstLoad && chatRooms.length > 0) {
//         dispatch(setCurrentChatRoom(chatRoomsArray[0]));
//       }
//       setFirstLoad(false);
//     });
//   };

//   const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (isFormValid(name, description)) {
//       addChatRoom();
//     } else {
//       alert('채널의 이름과 설명을 입력해주세요.');
//     }
//   };

//   const addChatRoom = async () => {
//     const key = chatRoomsRef.push().key;
//     const newChatRoom = {
//       id: key,
//       name: name,
//       description: description,
//       createdBy: {
//         name: user.displayName,
//         image: user.photoURL,
//       },
//     };

//     try {
//       await chatRoomsRef.child(key).update(newChatRoom);
//       setName('');
//       setDescription('');
//       setShow(false);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const isFormValid = (name: string, description: string) => {
//     return name && description;
//   };

//   return (
//     <>
//       <ChatRoomContainer>
//         <FaRegSmileWink style={{ marginRight: 3 }} />
//         Chat Rooms
//         <FaPlus
//           onClick={handleShow}
//           style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
//         />
//       </ChatRoomContainer>

//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         {chatRooms.length > 0 &&
//           chatRooms.map((room: any) => (
//             <li key={room.id} onClick={() => changeChatRoom(room)}>
//               # {room.name}
//             </li>
//           ))}
//       </ul>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create ChatRoom</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Room Name</Form.Label>
//               <Form.Control
//                 onChange={(e) => setName(e.target.value)}
//                 type="text"
//                 placeholder="Enter a chat room name"
//               />
//             </Form.Group>
//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Room Explanation</Form.Label>
//               <Form.Control
//                 onChange={(e) => setDescription(e.target.value)}
//                 type="text"
//                 placeholder="Enter a chat room description"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ChatRoom;

// const ChatRoomContainer = styled.div`
//   margin-top: 10px;
//   position: relative;
//   width: 100%;
//   display: flex;
//   align-items: center;
// `;
