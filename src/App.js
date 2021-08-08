
import Game from './Game';
import GameController from './GameController';
import { StateProvider } from './Store.js';


function App() {




  return (
    <div>
      <StateProvider>
        <GameController></GameController>
      </StateProvider>

    </div>
  );
}

export default App;
