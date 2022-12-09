import {
  FIRST_COLUMN_PRODUCT_RESULT,
  LAST_COLUMN_PRODUCT_RESULT,
  LEAVE_SECTION_DIRECTION_ATTR,
  PARENT_SECTION_ATTR,
  SECTION_CURRENT_FOCUSED_CHILDREN_ATTR,
  SECTION_GRID_COLUMN_ATTR,
  SECTION_GRID_ROW_ATTR,
  SECTION_ID_ATTR,
} from "./constants";
import { all, qs } from "./dom";
import { handleFocusElement } from "./nagivation";
import { Directions, SectionDirections } from "./types";
import { getGridFocusPositions, isGridAttrValid } from "./utils";

export class ManagedDirectionalSection {
  sectionId: string;
  $sectionEl: HTMLElement;
  chidlrens: NodeList;
  currentFocusedChildrenIndex: number;
  direction: SectionDirections;
  gridRows?: number;
  gridColumns?: number;

  constructor(sectionId: string, direction: SectionDirections) {
    this.sectionId = sectionId;
    this.direction = direction;

    const $sectionEl = qs(`[${SECTION_ID_ATTR}='${sectionId}']`);

    if (!$sectionEl)
      throw new Error(
        `Error: Unable to instantiate a section. Tried to querySelector([${SECTION_ID_ATTR}=${sectionId}]) but not found any match element.`
      );

    this.$sectionEl = $sectionEl;

    this.chidlrens = all(`[${PARENT_SECTION_ATTR}='${sectionId}']`);

    const childrenIndex = $sectionEl.getAttribute(
      SECTION_CURRENT_FOCUSED_CHILDREN_ATTR
    );

    this.currentFocusedChildrenIndex = childrenIndex
      ? Number(childrenIndex)
      : 0;

    if (direction === "grid") {
      const gridRows = $sectionEl.getAttribute(SECTION_GRID_ROW_ATTR);
      const gridColumns = $sectionEl.getAttribute(SECTION_GRID_COLUMN_ATTR);

      if (
        !gridRows ||
        !gridColumns ||
        !isGridAttrValid(gridRows) ||
        !isGridAttrValid(gridColumns)
      ) {
        throw new Error(
          `Tried to instantiate a grid section with invalid columns or rows. Received: data-grid-rows="${gridRows}" and data-grid-columns="${gridColumns}". Both are required. Please add a integer number greater than 0.`
        );
      }

      this.gridRows = +gridRows;
      this.gridColumns = +gridColumns;
    }
  }

  setCurrentFocusedChildrenIndex(index: number) {
    this.$sectionEl.setAttribute(
      SECTION_CURRENT_FOCUSED_CHILDREN_ATTR,
      String(index)
    );

    this.currentFocusedChildrenIndex = index;
  }

  leaveSection(direction: Directions) {
    console.log(`leave ${direction}`);
    const leaveToSelector = this.$sectionEl.getAttribute(
      `${LEAVE_SECTION_DIRECTION_ATTR.replace("{direction}", direction)}`
    );

    console.log(leaveToSelector);

    if (!leaveToSelector) return;

    const leaveToElement = qs(leaveToSelector);

    if (!leaveToElement) return;

    handleFocusElement(leaveToElement);
  }

  handleGridFocus(keyPressed: Directions) {
    if (!this.gridColumns || !this.gridRows) return;

    const index = this.currentFocusedChildrenIndex;

    const {
      isFocusInFirstColumn,
      isFocusInLastColumn,
      isFocusInFirstRow,
      isFocusInLastRow,
    } = getGridFocusPositions({
      index,
      rows: this.gridRows,
      columns: this.gridColumns,
    });

    switch (keyPressed) {
      case Directions.RIGHT:
        return isFocusInLastColumn
          ? this.leaveSection(Directions.RIGHT)
          : this.focusIndex(index + 1);

      case Directions.LEFT:
        return isFocusInFirstColumn
          ? this.leaveSection(Directions.LEFT)
          : this.focusIndex(index - 1);

      case Directions.UP:
        return isFocusInFirstRow
          ? this.leaveSection(Directions.UP)
          : this.focusIndex(index - this.gridColumns);

      case Directions.DOWN:
        return isFocusInLastRow
          ? this.leaveSection(Directions.DOWN)
          : this.focusIndex(index + this.gridColumns);
      default:
        return;
    }
  }

  focusFromKeyPressed(keyPressed: Directions) {
    if (this.direction === "grid") {
      console.log(this.chidlrens.item(this.currentFocusedChildrenIndex));
      this.handleGridFocus(keyPressed);
    }

    if (this.direction === "horizontal") {
      if (keyPressed === Directions.RIGHT) {
        return this.focusNext();
      }

      if (keyPressed === Directions.LEFT) {
        return this.focusPrevious();
      }

      return this.leaveSection(keyPressed);
    }

    if (this.direction === "vertical") {
      if (keyPressed === Directions.DOWN) {
        return this.focusNext();
      }

      if (keyPressed === Directions.UP) {
        return this.focusPrevious();
      }

      return this.leaveSection(keyPressed);
    }
  }

  focusPrevious() {
    const previousFocusIndex = this.currentFocusedChildrenIndex - 1;

    if (previousFocusIndex >= 0) {
      const previousFocusElement = this.chidlrens.item(
        previousFocusIndex
      ) as HTMLElement | null;

      if (!previousFocusElement) return;

      this.setCurrentFocusedChildrenIndex(previousFocusIndex);

      return handleFocusElement(previousFocusElement);
    }

    if (this.direction === "horizontal") {
      this.leaveSection(Directions.LEFT);
    }

    if (this.direction === "vertical") {
      this.leaveSection(Directions.UP);
    }
  }

  focusNext() {
    const nextFocusIndex = this.currentFocusedChildrenIndex + 1;

    if (nextFocusIndex <= this.chidlrens.length) {
      const nextFocusElement = this.chidlrens.item(
        nextFocusIndex
      ) as HTMLElement | null;

      if (!nextFocusElement) return;

      this.setCurrentFocusedChildrenIndex(nextFocusIndex);

      return handleFocusElement(nextFocusElement);
    }

    if (this.direction === "horizontal") {
      this.leaveSection(Directions.RIGHT);
    }

    if (this.direction === "vertical") {
      this.leaveSection(Directions.DOWN);
    }
  }

  focusIndex(index: number) {
    const focusCandidate = this.chidlrens.item(index) as HTMLElement | null;

    if (focusCandidate) {
      handleFocusElement(focusCandidate);
      this.setCurrentFocusedChildrenIndex(index);
    }
  }

  focusLastFocusedElement() {
    console.log(this.chidlrens, this.currentFocusedChildrenIndex);
    const lastCurrentFocusedElement = this.chidlrens.item(
      this.currentFocusedChildrenIndex
    ) as HTMLElement | null;
    console.log(lastCurrentFocusedElement);
    if (!lastCurrentFocusedElement) return;

    handleFocusElement(lastCurrentFocusedElement);
  }
}

export function getSection(sectionId: string) {
  if (!window.__sections__) return;

  const section = window.__sections__[sectionId] as
    | ManagedDirectionalSection
    | undefined;

  return section;
}
