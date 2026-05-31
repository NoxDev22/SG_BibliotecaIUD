import { getViewBooks } from "./bookState.js";
let pgConfig = { lowerLimit: 0, upperLimit: 3, pgCurrent: 1 };

export function getPaginationState() {
  function handleNext() {
    pgConfig["lowerLimit"] = pgConfig["lowerLimit"] + getViewBooks();
    pgConfig["upperLimit"] = pgConfig["upperLimit"] + getViewBooks();
  }

  function handleByValue(value) {
    pgConfig["lowerLimit"] = value * getViewBooks();
    pgConfig["upperLimit"] = (value + 1) * getViewBooks();
    pgConfig["pgCurrent"] = value + 1;
    // 0 * 1
  }

  function resetPagination() {
    pgConfig["lowerLimit"] = 0;
    pgConfig["upperLimit"] = 3;
    pgConfig["pgCurrent"] = 1;
  }

  function handlePrev() {
    pgConfig["lowerLimit"] = pgConfig["lowerLimit"] - getViewBooks();
    pgConfig["upperLimit"] = pgConfig["upperLimit"] - getViewBooks();
  }
  function increasePgCurrent() {
    pgConfig["pgCurrent"]++;
  }
  function decreasePgCurrent() {
    pgConfig["pgCurrent"]--;
  }
  return {
    pgConfig,
    handleNext,
    handlePrev,
    handleByValue,
    resetPagination,
    increasePgCurrent,
    decreasePgCurrent,
  };
}
