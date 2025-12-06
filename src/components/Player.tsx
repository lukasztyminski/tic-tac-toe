import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { PlayerSymbol } from '../types/game';

interface PlayerProps {
  initialName: string;
  symbol: PlayerSymbol;
  isActive: boolean;
  onNameChange: (symbol: PlayerSymbol, newName: string) => void;
}

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}: PlayerProps) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
