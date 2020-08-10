export interface BaseEvent {
  type: string;
}

export interface Event<Type extends string> extends BaseEvent {
  type: Type;
}
