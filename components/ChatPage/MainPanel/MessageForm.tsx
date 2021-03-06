import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import firebase from '../../../firebase';
import { useSelector } from 'react-redux';

const MessageForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const messageRef = firebase.database().ref('messages');
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const user = useSelector((state) => state.user.currentUser);
  const handleChange = (event) => {
    setContent(event?.target.value);
  };

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message['image'] = fileUrl;
    } else {
      message['content'] = content;
    }
    return message;
  };

  const handleSubmit = async () => {
    if (!content) {
      setErrors((prev) => prev.concat('Type contents First'));
      return;
    }
    setLoading(true);
    //firebase에 메시지 저장하는 부분
    try {
      await messageRef.child(chatRoom.id).push().set(createMessage());
      setLoading(false);
      setContent('');
      setErrors([]);
    } catch (error) {
      setErrors((prev) => prev.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };
  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={content}
              onChange={handleChange}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
        <ProgressBar variant="warning" label="60" now={60} />
        <div>
          {errors.map((errorMsg) => (
            <p style={{ color: 'red' }} key={errorMsg}>
              {errorMsg}
            </p>
          ))}
        </div>
        <Row>
          <Col>
            <button
              onClick={handleSubmit}
              className="message-form-button"
              style={{ width: '100%' }}
            >
              SEND
            </button>
          </Col>
          <Col>
            <button className="message-form-button" style={{ width: '100%' }}>
              UPLOAD
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MessageForm;
