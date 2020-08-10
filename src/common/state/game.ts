import { flow, get, gt, lt, toLength, where } from 'lodash/fp';
import { actions, Machine, spawn, interpret } from 'xstate';
import { PlayerActions, playerMachine, PlayerStateContext } from './players';

const { assign } = actions;

export enum GameStatus {
  NotStarted = 'NotStarted',
  Playing = 'Playing',
  Finished = 'Finished',
}

export enum GameAction {
  Start = 'Start',
  End = 'End',
  Restart = 'Restart',
  Reset = 'Reset',
}

export interface GameStateSchema {
  states: Record<GameStatus, {}>;
}

export interface GameStateContext {
  players: PlayerStateContext[];
}

export type GameEvent = { type: GameAction | PlayerActions };

export const gameMachine = Machine<GameStateContext, GameStateSchema>(
  {
    id: 'game',
    initial: GameStatus.NotStarted,
    context: { players: [] },
    states: {
      [GameStatus.NotStarted]: {
        on: {
          [GameAction.Start]: {
            target: GameStatus.Playing,
            cond: flow(get('players'), toLength, gt(1)),
          },
        },
      },
      [GameStatus.Playing]: {
        on: {
          [GameAction.End]: GameStatus.Finished,
          [GameAction.Restart]: GameStatus.Playing,
          [GameAction.Reset]: GameStatus.NotStarted,
        },
      },
      [GameStatus.Finished]: {
        on: {
          [GameAction.Reset]: GameStatus.NotStarted,
        },
      },
    },
  },
  {
    actions: {
      registerPlayer: assign({
        players: (context, event) =>
          context.players.concat([
            {
              id: event.playerId,
              ref: spawn(playerMachine, { name: `player-${event.playerId}` }),
            },
          ]),
      }),
      unregisterPlayer: assign({
        players: (context, event) => context.players.filter(where({ id: event.playerId })),
      }),
    },
  },
);
