/**
 * An interface for the time model used by the timepicker.
 */
export interface NgbTimeStruct {
  /**
   * The hour in the `[0, 23]` range.
   */
  hour: number;

  /**
   * The minute in the `[0, 59]` range.
   */
  minute: number;

  /**
   * The second in the `[0, 59]` range.
   */
  second: number;
}
