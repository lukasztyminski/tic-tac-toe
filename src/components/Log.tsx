import { Turn } from '../App';

export default function Log({ turns }: { turns: Turn[] }) {
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
