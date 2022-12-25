export enum Directions {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

export enum KeyCodes {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
}

export type SectionDirections = "horizontal" | "vertical" | "grid";

export type FocusPositions = {
  isFocusInFirstColumn: boolean;
  isFocusInLastColumn: boolean;
  isFocusInFirstRow: boolean;
  isFocusInLastRow: boolean;
};

export type GetGridFocusPositionsParams = {
  index: number;
  rows: number;
  columns: number;
};
