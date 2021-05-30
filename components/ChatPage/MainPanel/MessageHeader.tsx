import styled from 'styled-components';
import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaLock } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MessageHeader: React.FC = () => {
  return (
    <>
      <MessageHeaderContainer>
        <Container>
          <Row>
            <Col>
              <h2>
                {' '}
                <FaLock /> ChatRoomName <MdFavorite />
              </h2>
            </Col>
            <Col>
              {' '}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search Messages"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p>
              <Image src="" /> User name
            </p>
          </div>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Card.Header style={{ padding: '0 1rem' }}>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Click me!
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I am the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col>
              <Accordion>
                <Card>
                  <Card.Header style={{ padding: '0 1rem' }}>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Click me!
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I am the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </MessageHeaderContainer>
    </>
  );
};

export default MessageHeader;

const MessageHeaderContainer = styled.div`
  width: 100%;
  height: 160px;
  border: 0.1rem solid #ececec;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;
