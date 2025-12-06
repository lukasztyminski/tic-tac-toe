import { PlayerSymbol } from '../App';

type GameBoardProps = {
  board: PlayerSymbol[][];
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
};

export default function GameBoard({ board, onSelectSquare }: GameBoardProps) {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={`${rowIndex}-${colIndex}`}>
                <button
                  disabled={playerSymbol !== null}
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
