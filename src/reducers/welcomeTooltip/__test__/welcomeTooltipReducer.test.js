/**
 * @file welcomeTooltipReducer.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import welcomeTooltipReducer, {
  setStageNumberWelcomeTooltip,
  setStageNumberWelcomeTooltipEnd,
} from "../welcomeTooltipReducer";

describe("welcomeTooltipReducer", () => {
  const initialState = {
    stageNumber: -1,
  };

  it("should return the initial state", () => {
    expect(welcomeTooltipReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle setStageNumberWelcomeTooltip", () => {
    const newState = welcomeTooltipReducer(
      initialState,
      setStageNumberWelcomeTooltip(initialState)
    );
    expect(newState.stageNumber).toEqual(0);
  });

  it("should handle setStageNumberWelcomeTooltipEnd", () => {
    const newState = welcomeTooltipReducer(
      initialState,
      setStageNumberWelcomeTooltipEnd(3)
    );
    expect(newState.stageNumber).toEqual(3);
  });
});
