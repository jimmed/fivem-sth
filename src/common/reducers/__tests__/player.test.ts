import { PlayerEventType, AnyEvent } from '../../events';
import { playerReducer, PlayerState, PlayerStatus, PlayerTeam } from '../player';
import { describeReducer } from './utils';

describeReducer<PlayerState, AnyEvent>('player', playerReducer, describeTransition => {
  const initialState: PlayerState = Object.freeze({
    id: '1',
    name: 'Some Player',
    status: PlayerStatus.Unready,
    team: PlayerTeam.Spectator,
    kills: 0,
    deaths: 0,
  });

  describeTransition(
    'when the player disconnects',
    initialState,
    { type: PlayerEventType.Disconnect, playerId: initialState.id },
    afterDisconnect => {
      it('marks the player as disconnected', () => {
        expect(afterDisconnect.status).toBe(PlayerStatus.Disconnected);
      });
    },
  );

  describeTransition(
    'when the player is ready',
    initialState,
    { type: PlayerEventType.Ready, playerId: initialState.id },
    afterReady => {
      it('marks the player as ready', () => {
        expect(afterReady.status).toBe(PlayerStatus.Ready);
      });

      describeTransition(
        'when the player is unready',
        afterReady,
        { type: PlayerEventType.Unready, playerId: afterReady.id },
        afterUnready => {
          it('marks the player as unready', () => {
            expect(afterUnready.status).toBe(PlayerStatus.Unready);
          });
        },
      );

      describeTransition(
        'when the player is killed by another player',
        afterReady,
        { type: PlayerEventType.Died, playerId: afterReady.id, killedByPlayerId: '2' },
        afterDied => {
          it('marks the player as dead', () => {
            expect(afterDied.status).toBe(PlayerStatus.Dead);
          });
          it("increments the player's death counter", () => {
            expect(afterDied.deaths).toBe(initialState.deaths + 1);
          });
        },
      );

      describeTransition(
        'when the player kills themself',
        afterReady,
        { type: PlayerEventType.Died, playerId: afterReady.id, killedByPlayerId: afterReady.id },
        afterDied => {
          it('marks the player as dead', () => {
            expect(afterDied.status).toBe(PlayerStatus.Dead);
          });
          it("increments the player's death counter", () => {
            expect(afterDied.deaths).toBe(initialState.deaths + 1);
          });
          it("does not increment the player's kill counter", () => {
            expect(afterDied.kills).toBe(initialState.kills);
          });
        },
      );

      describeTransition(
        'when the player kills another player',
        afterReady,
        {
          type: PlayerEventType.Died,
          playerId: '2',
          killedByPlayerId: afterReady.id,
        },
        afterDied => {
          it("does not affect the player's status", () => {
            expect(afterDied.status).toBe(afterReady.status);
          });
          it("does not increment the player's death counter", () => {
            expect(afterDied.deaths).toBe(initialState.deaths);
          });
          it("increments the player's kill counter", () => {
            expect(afterDied.kills).toBe(initialState.kills + 1);
          });
        },
      );
    },
  );
});
