import produce from 'immer';
import { AnyEvent, AnyPlayerEvent, PlayerEventType, RoundEventType } from '../events';

export enum PlayerStatus {
  Unready,
  Ready,
  Playing,
  Dead,
  Disconnected,
}

export enum PlayerTeam {
  Spectator,
  Survivor,
  Hunter,
}

export interface PlayerState {
  id: string;
  name: string;
  status: PlayerStatus;
  team: PlayerTeam;
  kills: number;
  deaths: number;
}

export const playerReducer = produce((player: PlayerState, event: AnyEvent) => {
  if ((event as AnyPlayerEvent).playerId === player.id) {
    switch (event.type) {
      case PlayerEventType.Disconnect: {
        player.status = PlayerStatus.Disconnected;
        break;
      }
      case PlayerEventType.Ready: {
        player.status = PlayerStatus.Ready;
        break;
      }
      case PlayerEventType.Unready: {
        player.status = PlayerStatus.Unready;
        break;
      }
      case PlayerEventType.Died: {
        player.status = PlayerStatus.Dead;
        player.deaths++;
        break;
      }
      case PlayerEventType.ChangedTeams: {
        player.team = event.newTeam;
        break;
      }
    }
  }

  switch (event.type) {
    case RoundEventType.Reset: {
      player.status = PlayerStatus.Unready;
      player.team = PlayerTeam.Spectator;
      break;
    }
    case PlayerEventType.Died: {
      if (event.killedByPlayerId === player.id && event.playerId !== player.id) {
        player.kills++;
        break;
      }
    }
  }
});
