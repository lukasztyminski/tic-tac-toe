import { PlayerSymbol } from '../App';

export default function GameOver({ winner }: { winner: PlayerSymbol }) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      <p>{winner} won!</p>
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}
