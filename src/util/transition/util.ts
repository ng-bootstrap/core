export function getTransitionDurationMs(element: HTMLElement) {
  const {transitionDelay, transitionDuration} = window.getComputedStyle(element);
  const transitionDelaySec = parseFloat(transitionDelay);
  const transitionDurationSec = parseFloat(transitionDuration);

  return (transitionDelaySec + transitionDurationSec) * 1000;
}
