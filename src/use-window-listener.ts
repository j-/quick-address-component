/**
 * Attach an event listener to the `window` global. Will remove the listener on
 * cleanup.
 *
 * @example
 *
 * useWindowListener('keydown', (e) => {
 *   console.log('Pressed key ' + e.key);
 * });
 */
export const useWindowListener = <K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any) => {
  window.addEventListener(type, listener);
  return () => window.removeEventListener(type, listener);
};
