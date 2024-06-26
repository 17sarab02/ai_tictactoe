import './App.css';
import Game from './Components/Game';
import Options from './Components/Options';

function App() {
  return (
    <div className="App">
      <h1>TicTacToe</h1>
      <Options></Options>
      <Game></Game>
    </div>
  );
}

export default App;
