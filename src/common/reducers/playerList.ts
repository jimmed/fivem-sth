import produce from 'immer';
import { eq, flow, get, omitBy } from 'lodash/fp';
import { AnyEvent, PlayerEventType, PlayerJoinedEvent, RoundEventType } from '../events';
import { PlayerState, PlayerStatus, PlayerTeam, playerReducer } from './player';
import { mapValues } from 'lodash';

export interface PlayerListState extends Record<string, PlayerState> {}

export const addPlayer = produce((state: PlayerListState, event: PlayerJoinedEvent) => {
  state[event.playerId] = {
    id: event.playerId,
    name: event.playerName,
    status: PlayerStatus.Unready,
    team: PlayerTeam.Spectator,
    kills: 0,
    deaths: 0,
  };
});

export const removeDisconnectedPlayers = omitBy(flow(get('status'), eq(PlayerStatus.Disconnected)));

export const playerListReducer = produce((players: PlayerListState, event: AnyEvent) => {
  switch (event.type) {
    case PlayerEventType.Joined:
      addPlayer(players, event);
      break;
    case RoundEventType.Reset: {
      removeDisconnectedPlayers(players);
      break;
    }
  }

  // Broadcast events to each player
  return mapValues(players, player => playerReducer(player, event));
}, {});
