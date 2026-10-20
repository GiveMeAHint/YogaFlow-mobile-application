import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import BoardPage from './pages/Boardpage';

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full bg-gray-50/30">
        <Topbar />
        <main className="flex-1 overflow-hidden">
          <BoardPage />
        </main>
      </div>
    </div>
  );
}

export default App;