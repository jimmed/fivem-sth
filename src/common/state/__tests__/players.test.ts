import { playerMachine, PlayerStatus, PlayerActions } from '../players';
import { interpret, Interpreter } from 'xstate';

describe('player state machine', () => {
  let machine: Interpreter<any, any, any>;
  beforeEach(() => {
    machine = interpret(playerMachine).start();
  });

  it('is initially connected', () => {
    expect(machine.state.value).toBe(PlayerStatus.Connected);
  });

  describe('when the player is marked as ready', () => {
    beforeEach(() => machine.send(PlayerActions.Ready));

    it('becomes ready', () => {
      expect(machine.state.value).toBe(PlayerStatus.Ready);
    });

    describe('when the player is marked as not ready', () => {
      beforeEach(() => machine.send(PlayerActions.Unready));

      it('becomes unready', () => {
        expect(machine.state.value).toBe(PlayerStatus.Connected);
      });
    });

    describe('when the player disconnects', () => {
      beforeEach(() => machine.send(PlayerActions.Disconnect));

      it('becomes disconnected', () => {
        expect(machine.state.value).toBe(PlayerStatus.Disconnected);
      });
    });
  });

  describe('when the player disconnects', () => {
    beforeEach(() => machine.send(PlayerActions.Disconnect));

    it('becomes disconnected', () => {
      expect(machine.state.value).toBe(PlayerStatus.Disconnected);
    });

    describe('when the player reconnects', () => {
      beforeEach(() => machine.send(PlayerActions.Connect));

      it('reconnects', () => {
        expect(machine.state.value).toBe(PlayerStatus.Connected);
      });
    });
  });
});
