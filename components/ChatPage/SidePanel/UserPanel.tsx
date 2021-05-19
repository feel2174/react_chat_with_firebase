import React, { useRef } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../firebase';
import mime from 'mime-types';
import { setPhotoURL } from '../../../redux/actions/user_action';

function UserPanel() {
  const inputOpenImageRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const handleOpenImageRef = () => {
    inputOpenImageRef?.current.click();
  };
  const handleUploadImage = async (event: any) => {
    const file = event.target.files[0];
    const metaData = { contentType: mime.lookup(file.name) };
    try {
      const uploadTaskSnapShot = await firebase
        .storage()
        .ref()
        .child(`user_image/${user.uid}`)
        .put(file, metaData);
      const downloadURL = await uploadTaskSnapShot.ref.getDownloadURL();
      await firebase.auth().currentUser?.updateProfile({
        photoURL: downloadURL,
      });
      dispatch(setPhotoURL(downloadURL));
      await firebase.database().ref('users').child(user.uid).update({
        image: downloadURL,
      });
    } catch (error) {
      alert(error);
    }
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
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} href="#/action-2">
              로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
        accept="image/jpg, image/png, image/jpeg"
        type="file"
        style={{ display: 'none' }}
      />
    </>
  );
}

export default UserPanel;
