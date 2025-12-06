export type PlayerSymbol = 'X' | 'O';

export type PlayerNames = Record<PlayerSymbol, string>;

export type SquarePosition = {
  row: number;
  col: number;
};

export type Turn = {
  square: SquarePosition;
  player: PlayerSymbol;
};

export type GameBoardState = (PlayerSymbol | null)[][];
