import { Machine, Interpreter } from 'xstate';

export enum PlayerStatus {
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  Ready = 'Ready',
}

export enum PlayerActions {
  Connect = 'Connect',
  Ready = 'Ready',
  Unready = 'Unready',
  Disconnect = 'Disconnect',
}

export interface PlayerStateSchema {
  states: Record<PlayerStatus, {}>;
}

export interface PlayerStateContext {
  id: string;
  ref: Interpreter<any>;
}

export const playerMachine = Machine<PlayerStateContext, { type: PlayerActions }>({
  id: 'player',
  initial: PlayerStatus.Connected,
  states: {
    [PlayerStatus.Disconnected]: {
      on: {
        [PlayerActions.Connect]: PlayerStatus.Connected,
      },
    },
    [PlayerStatus.Connected]: {
      on: {
        [PlayerActions.Ready]: PlayerStatus.Ready,
        [PlayerActions.Disconnect]: PlayerStatus.Disconnected,
      },
    },
    [PlayerStatus.Ready]: {
      on: {
        [PlayerActions.Unready]: PlayerStatus.Connected,
        [PlayerActions.Disconnect]: PlayerStatus.Disconnected,
      },
    },
  },
});
