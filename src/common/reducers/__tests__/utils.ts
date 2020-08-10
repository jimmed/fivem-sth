import { AnyEvent } from '../../events';

interface Reducer<S, E extends AnyEvent> {
  (state: S, event: E): S;
}

interface TransitionDescriber<S, E extends AnyEvent> {
  (name: string, initialState: S, event: E, defineTestCases: (result: S) => void): void;
}

export const describeReducer = <S, E extends AnyEvent>(
  name: string,
  reducer: Reducer<S, E>,
  defineTransitions: (describeTransition: TransitionDescriber<S, E>) => void,
): void => {
  describe(`Reducer: ${name}`, () => defineTransitions(describeTransition(reducer)));
};

const describeTransition = <S, E extends AnyEvent>(
  reducer: Reducer<S, E>,
): TransitionDescriber<S, E> => (name, initialState, event, defineTestCases) => {
  describe(name, () => defineTestCases(reducer(initialState, event)));
};
