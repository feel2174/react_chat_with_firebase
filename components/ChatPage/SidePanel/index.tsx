import styled from 'styled-components';
import ChatRoom from './ChatRoom';
import DirectMessage from './DirectMessages';
import Favorites from './Favorites';
import UserPanel from './UserPanel';

const SidePanel: React.FC = () => {
  return (
    <>
      <PanelContainer>
        <UserPanel />
        <Favorites />
        <ChatRoom />
        <DirectMessage />
      </PanelContainer>
    </>
  );
};

export default SidePanel;

const PanelContainer = styled.div`
  background-color: #7b83eb;
  padding: 2rem;
  min-height: 100vh;
  color: white;
  min-width: 275px;
`;
