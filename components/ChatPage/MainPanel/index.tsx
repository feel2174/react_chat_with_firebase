import styled from 'styled-components';
import Message from './Message';
import MessageForm from './MessageForm';
import MessageHeader from './MessageHeader';

const MainPanel: React.FC = () => {
  return (
    <>
      <div style={{ padding: '2rem 2rem 0 2rem' }}>
        <MessageHeader />
      </div>
      <PanelContainer>
        <Message />
        <MessageForm />
      </PanelContainer>
    </>
  );
};

export default MainPanel;

const PanelContainer = styled.div`
  width: 100%;
  height: 450px;
  border: 0.2rem solid #ececec;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
`;
