export interface RoundConfiguration {
  roundLength: number;
  survivorCount: number;
  survivorObjectiveCount: number;
  allSurvivorsMustSurvive: boolean;
  survivorHeadStart: number;
}

export const defaultRoundConfiguration: RoundConfiguration = {
  roundLength: 24 * 60,
  survivorCount: 1,
  survivorObjectiveCount: 12,
  allSurvivorsMustSurvive: false,
  survivorHeadStart: 30,
};

export const roundConfig: RoundConfiguration = { ...defaultRoundConfiguration };
