import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';
import { WINNING_COMBINATIONS } from './utils/winning-combinations';
import type {
  GameBoardState,
  PlayerNames,
  PlayerSymbol,
  Turn,
} from './types/game';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
] satisfies GameBoardState;

const INITIAL_PLAYERS: PlayerNames = {
  X: 'Player 1',
  O: 'Player 2',
};

function deriveActivePlayer(gameTurns: readonly Turn[]): PlayerSymbol {
  let currentPlayer: PlayerSymbol = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns: readonly Turn[]): GameBoardState {
  const gameBoard: GameBoardState = [
    ...INITIAL_GAME_BOARD.map((row) => [...row]),
  ];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard: GameBoardState, players: PlayerNames) {
  let winningPlayer = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winningPlayer = players[firstSquareSymbol];
    }
  }

  return winningPlayer;
}

function App() {
  const [players, setPlayers] = useState<PlayerNames>(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hadDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol: PlayerSymbol, newName: string) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  };

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            isActive={activePlayer === 'X'}
            initialName={INITIAL_PLAYERS.X}
            symbol='X'
            onNameChange={handlePlayerNameChange}
          />
          <Player
            isActive={activePlayer === 'O'}
            initialName={INITIAL_PLAYERS.O}
            symbol='O'
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hadDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
