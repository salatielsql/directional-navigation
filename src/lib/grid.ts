import {
  FIRST_COLUMN_PRODUCT_RESULT,
  LAST_COLUMN_PRODUCT_RESULT,
} from "./constants";

import { GetGridFocusPositionsParams } from "./types";

export function isGridAttrValid(attr: string | null) {
  if (!attr) return false;

  if (+attr < 0) return false;

  return Number.isInteger(+attr);
}

export function getGridFocusPositions({
  index,
  rows,
  columns,
}: GetGridFocusPositionsParams) {
  const gridIndex = index + 1;

  const lastIndex = rows * columns;
  const lastIndexInSecondLastRow = lastIndex - columns;

  const isFocusInFirstColumn =
    gridIndex % columns === FIRST_COLUMN_PRODUCT_RESULT;

  const isFocusInLastColumn =
    gridIndex % columns === LAST_COLUMN_PRODUCT_RESULT;

  const isFocusInFirstRow = gridIndex <= rows;

  const isFocusInLastRow =
    gridIndex <= lastIndex && gridIndex > lastIndexInSecondLastRow;

  return {
    isFocusInFirstColumn,
    isFocusInLastColumn,
    isFocusInFirstRow,
    isFocusInLastRow,
  };
}
