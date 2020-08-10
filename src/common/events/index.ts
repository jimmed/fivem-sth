import { AnyRoundEvent } from './round';
import { AnyPlayerEvent } from './player';

export * from './round';
export * from './player';

export type AnyEvent = AnyRoundEvent | AnyPlayerEvent;
