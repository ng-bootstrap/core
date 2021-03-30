import {getTransitionDurationMs} from './util';

function fromString(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  const firstChild = div.firstChild as HTMLElement;
  document.body.appendChild(firstChild);
  return firstChild;
}

describe('transition utils', () => {

  describe('getTransitionDurationMs', () => {

    let element: HTMLElement;

    afterEach(() => document.body.removeChild(element));

    it('should return 0 if there is no transition explicitly set', () => {
      element = fromString(`<div></div>`);
      expect(getTransitionDurationMs(element)).toBe(0);
    });

    it('should return correct transition duration from the element (seconds)', () => {
      element = fromString(`<div style="transition: opacity 0.01s linear"></div>`);
      expect(getTransitionDurationMs(element)).toBe(10);
    });

    it('should return correct transition duration from the element (milliseconds)', () => {
      element = fromString(`<div style="transition: opacity 10ms linear"></div>`);
      expect(getTransitionDurationMs(element)).toBe(10);
    });

    it('should return correct transition duration wih delay', () => {
      element = fromString(`<div style="transition: opacity 0.01s linear 0.02s"></div>`);
      expect(getTransitionDurationMs(element)).toBe(30);
    });

    it('should return correct transition duration wih delay (separate declaration)', () => {
      element = fromString(`<div style="transition-delay: 0.02s; transition-duration: 0.01s"></div>`);
      expect(getTransitionDurationMs(element)).toBe(30);
    });

    it('should return the duration of the first one in case of multiple transitions', () => {
      element = fromString(`<div style="transition: opacity 0.01s, color 0.02s"></div>`);
      expect(getTransitionDurationMs(element)).toBe(10);
    });
  });
});
