import { useState } from 'react';

interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
}

export default function Player({ initialName, symbol, isActive }: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {isEditing ? (
          <>
            <input
              type='text'
              onChange={handleNameChange}
              required
              value={playerName}
            />
            <input type='text' value={symbol} />
          </>
        ) : (
          <>
            <span className='player-name'>{playerName}</span>
            <span className='player-symbol'>{symbol}</span>
          </>
        )}
      </span>
      <button onClick={toggleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
