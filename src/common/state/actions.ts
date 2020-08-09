export enum ActionType {
  RESET,
  REGISTER_PLAYER,
  UNREGISTER_PLAYER,
  PLAYER_READY_CHANGE,
}

export interface Action {
  type: ActionType;
}

export interface ResetAction extends Action {
  type: ActionType.RESET;
}

export interface RegisterPlayerAction extends Action {
  type: ActionType.REGISTER_PLAYER;
  playerId: string;
}

export interface UnregisterPlayerAction extends Action {
  type: ActionType.UNREGISTER_PLAYER;
  playerId: string;
}

export interface PlayerReadyAction extends Action {
  type: ActionType.PLAYER_READY_CHANGE;
  playerId: string;
  isReady: boolean;
}

export type AnyAction =
  | ResetAction
  | RegisterPlayerAction
  | UnregisterPlayerAction
  | PlayerReadyAction;
