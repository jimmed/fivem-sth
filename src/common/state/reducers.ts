import {
  GameStateType,
  GameAwaitingPlayersState,
  GameRoundPlayingState,
  AnyGameState,
  PlayerRole,
} from './types';
import {
  AnyAction,
  ResetAction,
  PlayerReadyAction,
  RegisterPlayerAction,
  UnregisterPlayerAction,
} from './actions';

export interface Reducer<
  S extends AnyGameState = AnyGameState,
  R extends AnyGameState = AnyGameState,
  A extends void | AnyAction = void
> {
  (state: S, action: A): R;
}

export const resetState: Reducer<AnyGameState, GameAwaitingPlayersState, ResetAction> = state => ({
  players: state.players || {},
  state: GameStateType.AWAITING_PLAYERS,
  lastStateChangeTick: 0,
});

export const registerPlayer: Reducer<
  GameAwaitingPlayersState,
  GameAwaitingPlayersState,
  RegisterPlayerAction
> = ({ players, ...state }, { playerId }) => ({
  ...state,
  players: {
    ...players,
    [playerId]: { id: playerId, isReady: false, role: PlayerRole.SPECTATOR, isAlive: true },
  },
});

export const setPlayerReady: Reducer<
  GameAwaitingPlayersState,
  GameAwaitingPlayersState | GameRoundPlayingState,
  PlayerReadyAction
> = ({ players, ...state }, { playerId, isReady }) => ({
  ...state,
  players: { ...players, [playerId]: { ...players[playerId], isReady } },
});

export const unregisterPlayer: Reducer<AnyGameState, AnyGameState, UnregisterPlayerAction> = (
  { players, ...state },
  { playerId },
) =>
  // TODO: Remove player
  ({ ...state, players: { ...players } });
