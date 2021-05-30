import MainPanel from './MainPanel';
import SidePanel from './SidePanel';

const ChatPage = () => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px' }}>
          <SidePanel />
        </div>
        <div style={{ width: '100%' }}>
          <MainPanel />
        </div>
      </div>
    </>
  );
};
export default ChatPage;
