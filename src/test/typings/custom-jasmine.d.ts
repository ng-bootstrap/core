declare module jasmine {
  interface Matchers<T> {
    toHaveToast(content?: string | string[]): boolean;
    toHaveCssClass(expected: any): boolean;
    toHaveModal(content?: string | string[], selector?: string): boolean;
    toHaveBackdrop(): boolean;
    toBeShown(): boolean;
  }
}
