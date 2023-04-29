import './App.css';
import MainForm from './Components/MainForm/MainForm';
import TopNavigation from './Components/TopNavigation/TopNavigation';

function App() {
  return (
    <div>
    <div className="App">
      <TopNavigation  key ="TopNavigation" className="topNav" />
    </div>
    <div className='MainForm' key="mainform">
      <MainForm />
    </div>
    </div>
  );
}

export default App;
