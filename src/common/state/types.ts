export enum GameStateType {
  AWAITING_PLAYERS,
  ROUND_PLAYING,
  ROUND_OVER,
}

export enum PlayerRole {
  SURVIVOR,
  HUNTER,
  SPECTATOR,
}

export interface PlayerState {
  id: string;
  role: PlayerRole;
  isAlive: boolean;
  isReady: boolean;
}

export interface GameState {
  state: GameStateType;
  players: Record<string, PlayerState>;
  lastStateChangeTick: number;
}

export interface GameAwaitingPlayersState extends GameState {
  state: GameStateType.AWAITING_PLAYERS;
}

export interface GameRoundPlayingState extends GameState {
  state: GameStateType.ROUND_PLAYING;
}

export interface GameRoundOverState extends GameState {
  state: GameStateType.ROUND_OVER;
  winningPlayerId: string;
}

export type AnyGameState = GameAwaitingPlayersState | GameRoundPlayingState | GameRoundOverState;
