import { Event } from './types';

export enum RoundEventType {
  Reset = 'Round.Reset',
  Started = 'Round.Started',
  Ended = 'Round.Ended',
}

export interface RoundEvent<Type extends RoundEventType> extends Event<Type> {}

export interface RoundResetEvent extends RoundEvent<RoundEventType.Reset> {}
export interface RoundStartedEvent extends RoundEvent<RoundEventType.Started> {}
export interface RoundEndedEvent extends RoundEvent<RoundEventType.Ended> {}

export type AnyRoundEvent = RoundResetEvent | RoundStartedEvent | RoundEndedEvent;
