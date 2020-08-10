import { PlayerTeam } from '../reducers/player';
import { Event } from './types';

export enum PlayerEventType {
  Joined = 'Player.Joined',
  Disconnect = 'Player.Quit',
  Ready = 'Player.Ready',
  Unready = 'Player.Unready',
  Died = 'Player.Died',
  ChangedTeams = 'Player.ChangedTeams',
}

export interface PlayerEvent<Type extends PlayerEventType> extends Event<Type> {
  playerId: string;
}

export interface PlayerJoinedEvent extends PlayerEvent<PlayerEventType.Joined> {
  playerName: string;
}
export interface PlayerQuitEvent extends PlayerEvent<PlayerEventType.Disconnect> {}
export interface PlayerReadyEvent extends PlayerEvent<PlayerEventType.Ready> {}
export interface PlayerUnreadyEvent extends PlayerEvent<PlayerEventType.Unready> {}
export interface PlayerDiedEvent extends PlayerEvent<PlayerEventType.Died> {
  killedByPlayerId: string;
}
export interface PlayerChangedTeamsEvent extends PlayerEvent<PlayerEventType.ChangedTeams> {
  newTeam: PlayerTeam;
}

export type AnyPlayerEvent =
  | PlayerJoinedEvent
  | PlayerQuitEvent
  | PlayerReadyEvent
  | PlayerUnreadyEvent
  | PlayerDiedEvent
  | PlayerChangedTeamsEvent;
