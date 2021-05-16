import React from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase';

function UserPanel() {
  const user = useSelector((state) => state.user!.currentUser);
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  return (
    <>
      <h3 style={{ color: 'white' }}>
        <IoIosChatboxes /> Chat App
      </h3>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <Image
          style={{ width: '30px', height: '30px', marginTop: '3px' }}
          src={user && user.photoURL}
          roundedCircle
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: 'transparent', border: 'none' }}
            id="dropdown-basic"
          >
            {user && user.displayName}{' '}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} href="#/action-2">
              로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default UserPanel;