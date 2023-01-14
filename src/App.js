import './App.css';
import AddAlarmButton from './components/AddAlarmButton';
import Alarm from './components/alarm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<AddAlarmButton />
		<Alarm hour='17' minutes='42' difficulty='easy'/>
      </header>
    </div>
  );
}

export default App;
