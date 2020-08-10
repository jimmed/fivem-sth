import produce from 'immer';
import { set } from 'lodash/fp';
import { AnyEvent, RoundEventType } from '../events';
import { playerListReducer, PlayerListState } from './playerList';

export enum RoundStatus {
  NotStarted = 'NotStarted',
  Started = 'Started',
  Ended = 'Ended',
}

export interface RoundState {
  state: RoundStatus;
  players: PlayerListState;
}

export const initialState: RoundState = {
  state: RoundStatus.NotStarted,
  players: {},
};

const setRoundState = set('state');
const roundEventHandlers = {
  [RoundEventType.Reset]: setRoundState(RoundStatus.NotStarted),
  [RoundEventType.Started]: setRoundState(RoundStatus.Started),
  [RoundEventType.Ended]: setRoundState(RoundStatus.Ended),
};

export const roundReducer = produce((state: RoundState, event: AnyEvent) => {
  // Handle round events
  roundEventHandlers[event.type]?.(state, event);

  // Broadcast events to player list
  state.players = playerListReducer(state.players, event);
}, initialState);
