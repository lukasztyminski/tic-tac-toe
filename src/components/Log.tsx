import type { Turn } from '../types/game';

type LogProps = {
  turns: Turn[];
};

export default function Log({ turns }: LogProps) {
  return (
    <ol id='log'>
      {turns.map((turn, index) => {
        const { square, player } = turn;
        return (
          <li key={`${square.row}-${square.col}-${index}`}>
            Player {player} selected square ({square.row}, {square.col})
          </li>
        );
      })}
    </ol>
  );
}
